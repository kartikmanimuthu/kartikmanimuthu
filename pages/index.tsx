import React from "react";
import Link from "next/link";
import SiteLayout from "../components/layout/SiteLayout";
import StatTile from "../components/ui/StatTile";
import { personalization } from "../metadata";

const STATS = [
  { value: "70×", label: "Order-volume scale in 10 months" },
  { value: "0.40ms", label: "Market-data latency, industry-lowest" },
  { value: "99.99%", label: "Uptime through peak volatility" },
  { value: "29–40%", label: "Annualized infra savings via FinOps" },
];

export default function Home() {
  return (
    <SiteLayout>
      <div className="wrap">
        <section className="hero">
          <p className="eyebrow">page · home</p>
          <div className="hero-grid">
            <div>
              <h1>I&apos;m Kartik Manimuthu. I take legacy institutions on-prem to AI-native.</h1>
              <p className="role">
                Senior Director of Engineering — AI &amp; Data · SMC Group · Mumbai
              </p>
              <p className="lede">
                I lead engineering for SMC Group&apos;s trading platform — cloud, data,
                and now applied AI — across a rebuild that took a 30-year-old broking
                house from on-premise servers to a hybrid-cloud system trading at
                national-exchange scale.
              </p>
              <p className="lede">
                Before this, I optimized cloud spend at BYJU&apos;S through its
                highest-traffic year, and ran a 42-person engineering org at Scrut
                Automation. I like systems that have to be right the first time —
                market-data feeds, reconciliation engines, anything where
                &quot;probably correct&quot; isn&apos;t good enough.
              </p>
              <div className="hero-cta">
                <a
                  className="btn primary"
                  href="https://www.linkedin.com/in/kartik-manimuthu"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a className="btn" href="mailto:kartikmanimuthu@gmail.com">
                  Email ↗
                </a>
              </div>
            </div>
            <div className="hero-photo">
              <img src={personalization.profilePicPublicPath} alt="Kartik Manimuthu" />
            </div>
          </div>

          <div className="stats">
            {STATS.map((stat) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="teaser-row">
            <div className="teaser teaser--cloud">
              <p className="k">Cloud &amp; Platform</p>
              <h4>Hyper-scale infrastructure</h4>
              <p>900 servers, 130 accounts, 0.40ms latency, 29–40% FinOps savings.</p>
              <Link href="/expertise#cloud">Full breakdown ↓</Link>
            </div>
            <div className="teaser teaser--ai">
              <p className="k">AI/ML &amp; GenAI</p>
              <h4>Applied, production LLMs</h4>
              <p>Self-hosted inference, fine-tuning, and the firm&apos;s GenAI platform.</p>
              <Link href="/expertise#ai">Full breakdown ↓</Link>
            </div>
            <div className="teaser teaser--data">
              <p className="k">Data Engineering</p>
              <h4>Lakehouse, built 0-to-1</h4>
              <p>SEBI-audited Medallion Lakehouse and real-time data products.</p>
              <Link href="/expertise#data">Full breakdown ↓</Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
