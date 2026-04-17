import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border bg-card-soft/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            AJEET BAIRWA
          </h2>
          <p className="text-xs uppercase tracking-wider text-accent mt-0.5">
            Frontend Developer
          </p>
          <p className="text-sm text-muted mt-3 leading-relaxed">
            Passionate about building clean UI, scalable web apps, and real-world
            admin dashboards.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li className="hover:text-accent cursor-pointer transition">Projects</li>
            <li className="hover:text-accent cursor-pointer transition">Skills</li>
            <li className="hover:text-accent cursor-pointer transition">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Connect
          </h3>
          <div className="mt-3 flex gap-2">
            <SocialBtn icon={<Github size={15} />} />
            <SocialBtn icon={<Linkedin size={15} />} />
            <SocialBtn icon={<Mail size={15} />} />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} AJEET BAIRWA · All rights reserved.</p>
          <p>Built with ❤️ using React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

const SocialBtn = ({ icon }) => (
  <button className="size-9 rounded-xl border border-border bg-card text-muted hover:text-foreground hover:bg-primary/15 hover:border-primary/40 flex items-center justify-center transition cursor-pointer">
    {icon}
  </button>
);

export default Footer;
