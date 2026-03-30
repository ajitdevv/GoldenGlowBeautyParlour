export const AddButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-primary bg-primary/80 py-2 whitespace-nowrap px-4 rounded-2xl transition-all duration-300 cursor-pointer text-foreground"
    >
      {children}
    </button>
  );
};

export const RetryButton = ({ children, onClick }) => {
  return (
    <button onClick={onclick} className="bg-accent p-2">
      {children}
    </button>
  );
};

export const SaveButton = ({ children, onClick, type, style, urloading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={urloading}
      className={`mt-3 bg-primary text-primary-foreground py-2 rounded-lg font-semibold shadow-shadow transition flex items-center justify-center gap-2
      ${urloading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"} ${style}`}
    >
      {urloading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {urloading ? "Saving..." : children}
    </button>
  );
};
