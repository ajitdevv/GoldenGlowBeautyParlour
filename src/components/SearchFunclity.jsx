import { Building2, Loader2, ReceiptText, Search, Tag, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetDeals, GetReports, Getmanufacturers } from "../apis/product";

let cache = { companies: [], deals: [], reports: [], loaded: false };

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const SearchFunclity = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ companies: [], deals: [], reports: [] });
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounced = useDebounce(query, 300);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const loadData = async () => {
    if (cache.loaded) return;
    setLoading(true);
    try {
      const [c, d, r] = await Promise.all([
        Getmanufacturers().catch(() => ({ data: [] })),
        GetDeals().catch(() => ({ data: [] })),
        GetReports().catch(() => ({ data: [] })),
      ]);
      cache = {
        companies: c.data || [],
        deals: d.data || [],
        reports: r.data || [],
        loaded: true,
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) {
      setResults({ companies: [], deals: [], reports: [] });
      return;
    }
    setResults({
      companies: cache.companies
        .filter(
          (i) =>
            i.name?.toLowerCase().includes(q) ||
            i.category?.toLowerCase().includes(q) ||
            i.country?.toLowerCase().includes(q) ||
            i.contact?.personName?.toLowerCase().includes(q)
        )
        .slice(0, 5),
      deals: cache.deals
        .filter(
          (i) =>
            i.title?.toLowerCase().includes(q) ||
            i.companyName?.toLowerCase().includes(q) ||
            i.stage?.toLowerCase().includes(q) ||
            i.status?.toLowerCase().includes(q)
        )
        .slice(0, 5),
      reports: cache.reports
        .filter(
          (i) =>
            i.title?.toLowerCase().includes(q) ||
            String(i.reportId || "").toLowerCase().includes(q) ||
            i.user?.name?.toLowerCase().includes(q) ||
            i.type?.toLowerCase().includes(q)
        )
        .slice(0, 5),
    });
  }, [debounced]);

  const handleNav = (path) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  };

  const total =
    results.companies.length + results.deals.length + results.reports.length;
  const hasQuery = debounced.trim().length > 0;
  const isTyping = query !== debounced;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onFocus={() => {
          setOpen(true);
          loadData();
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder="Search companies, deals, reports..."
        className="w-full rounded-xl border border-border bg-card-soft/70 pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 hover:bg-card-soft transition"
      />

      {(query || isTyping) && (
        <button
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 size-6 rounded-md hover:bg-card flex items-center justify-center text-muted hover:text-foreground transition"
          aria-label="Clear search"
        >
          {isTyping ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <X size={14} />
          )}
        </button>
      )}

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-(--shadow) animate-fadeUp">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-muted">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Loading workspace...</span>
            </div>
          ) : !hasQuery ? (
            <div className="px-4 py-6 text-center text-xs text-muted">
              Start typing to search across companies, deals, and reports.
            </div>
          ) : total === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              No results for{" "}
              <span className="font-medium text-foreground">"{debounced}"</span>
            </div>
          ) : (
            <div className="py-1">
              {results.companies.length > 0 && (
                <Group title="Companies" count={results.companies.length}>
                  {results.companies.map((c) => (
                    <ResultItem
                      key={`c-${c.id}`}
                      onClick={() => handleNav(`/admin/companies/details/${c.id}`)}
                      icon={<Building2 size={14} />}
                      title={c.name}
                      subtitle={`${c.category || ""} · ${c.country || ""}`}
                    />
                  ))}
                </Group>
              )}

              {results.deals.length > 0 && (
                <Group title="Deals" count={results.deals.length}>
                  {results.deals.map((d) => (
                    <ResultItem
                      key={`d-${d._id}`}
                      onClick={() => handleNav(`/admin/deal/${d._id}`)}
                      icon={<Tag size={14} />}
                      title={d.title}
                      subtitle={`${d.companyName || ""} · ${d.stage || ""}`}
                    />
                  ))}
                </Group>
              )}

              {results.reports.length > 0 && (
                <Group title="Reports" count={results.reports.length}>
                  {results.reports.map((r) => (
                    <ResultItem
                      key={`r-${r._id}`}
                      onClick={() => handleNav(`/admin/report/${r._id}`)}
                      icon={<ReceiptText size={14} />}
                      title={r.title}
                      subtitle={`${r.reportId || ""} · ${r.user?.name || ""}`}
                    />
                  ))}
                </Group>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Group = ({ title, count, children }) => (
  <div className="px-1.5 pb-1.5">
    <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </p>
      <span className="text-[10px] font-medium text-muted">{count}</span>
    </div>
    <div className="flex flex-col gap-0.5">{children}</div>
  </div>
);

const ResultItem = ({ icon, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-card-soft transition cursor-pointer"
  >
    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-accent ring-1 ring-primary/25">
      {icon}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-medium text-foreground">
        {title}
      </span>
      <span className="block truncate text-xs text-muted">{subtitle}</span>
    </span>
  </button>
);

export default SearchFunclity;
