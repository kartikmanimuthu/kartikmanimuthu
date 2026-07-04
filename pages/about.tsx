import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

export default function About() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · about</p>
        <h2 className="page-title">About</h2>
        <p className="page-sub">
          Senior Director of Engineering, AI &amp; Data — SMC Group, Mumbai.
        </p>

        <section className="about-section">
          <p>
            I specialize in 0-to-1 product building and 1-to-100 organizational
            scaling. Whether transitioning a legacy financial institution to a
            cloud-native platform or building enterprise GenAI agents on the Model
            Context Protocol, I work at the intersection of business strategy and
            deep engineering.
          </p>
          <p>
            Great software is a byproduct of great culture. I build for
            &quot;10x-ready&quot; standards, give engineers room to own hard
            problems, and treat FinOps and compliance as first-class engineering
            concerns — not afterthoughts.
          </p>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Awards</h3>
          <div className="list-row">
            <span>FinOps Leader of the Year</span>
            <span className="meta">Quantic FinOps Show, 2025</span>
          </div>
          <div className="list-row">
            <span>Architects of Innovation</span>
            <span className="meta">SMC TechLab, 2024</span>
          </div>
          <div className="list-row">
            <span>AWS Well-Architected Qualification</span>
            <span className="meta">2024</span>
          </div>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Publications</h3>
          <div className="list-row">
            <span>
              Building a high-performance exchange market-data broadcasting
              platform on AWS
            </span>
            <span className="meta">AWS, 09/2025</span>
          </div>
          <div className="list-row">
            <span>Enhancing Security: Shift-Left Strategies for AWS Native CI/CD</span>
            <span className="meta">Medium, 11/2024</span>
          </div>
          <div className="list-row">
            <span>Stoxkart&apos;s Revolutionizing Trading with Modern Infrastructure</span>
            <span className="meta">Motherson, 11/2025</span>
          </div>
        </section>

        <section className="about-section">
          <h3 style={{ fontSize: "18px", marginBottom: "14px" }}>Education</h3>
          <p>B.S., Computer Science — University of Mumbai, 2012 – 2015</p>
        </section>
      </div>
    </SiteLayout>
  );
}
