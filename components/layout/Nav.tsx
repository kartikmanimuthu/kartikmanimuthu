import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/expertise", label: "Expertise" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/uses", label: "Uses" },
];

const Nav: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <span className="site-nav-mark">Kartik Manimuthu</span>
        <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
          <div className="site-nav-links">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={router.pathname === link.href ? "active" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
