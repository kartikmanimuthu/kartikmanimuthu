import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

export default function Uses() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · uses</p>
        <h2 className="page-title">Uses</h2>
        <p className="page-sub">A glimpse into my workstation and the tools I use daily to build software.</p>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Workstation &amp; Hardware</h3>
          <ul>
            <li><b>Computer:</b> MacBook M1 Max (32GB RAM, 1TB SSD)</li>
            <li><b>Audio:</b> Apple AirPods Pro 2, Blue Yeti Mic</li>
            <li><b>Peripherals:</b> Logitech MX Master 3 Mouse, Logitech MX Keys Mini, Apple Trackpad, Fifine Low Profile Boom Arm</li>
          </ul>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Software &amp; Productivity</h3>
          <ul>
            <li><b>Antigravity:</b> Advanced AI IDE</li>
            <li><b>Cursor:</b> AI-first Code Editor</li>
            <li><b>Notion:</b> Knowledge Management</li>
          </ul>
        </section>
      </div>
    </SiteLayout>
  );
}
