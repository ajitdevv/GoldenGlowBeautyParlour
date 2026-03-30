import React from "react";

const Footer = () => {
  return (
    <footer className="bg-card-soft sticky border-t mt-16">
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 👤 About */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            AJEET BAIRWA (Frontend Developer)
          </h2>
          <p className="text-sm text-foreground/60 mt-2">
            Passionate about building clean UI, scalable web apps, and
            real-world admin dashboards.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="hover:text-accent cursor-pointer">Projects</li>
            <li className="hover:text-accent cursor-pointer">Skills</li>
            <li className="hover:text-accent cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Connect</h3>
          <div className="flex flex-col gap-2 text-sm text-foreground/70">
            <span className="hover:text-accent cursor-pointer">GitHub</span>
            <span className="hover:text-accent cursor-pointer">LinkedIn</span>
            <span className="hover:text-accent cursor-pointer">Email</span>
          </div>
        </div>
      </div>
      <div className="border-t text-center text-xs py-4 text-foreground/50">
        🚀 Built with ❤️ by AJEET BAIRWA • {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
