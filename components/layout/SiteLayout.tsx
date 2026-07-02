import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => (
  <div className="site-shell">
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default SiteLayout;
