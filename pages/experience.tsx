import React from "react";
import SiteLayout from "../components/layout/SiteLayout";

const EARLY_CAREER = [
  { title: "Senior Software Engineer — Finicity, a Mastercard Company", dates: "03/2021 – 08/2021" },
  { title: "Senior Software Engineer — CitiusTech Healthcare Technology", dates: "09/2019 – 03/2021" },
  { title: "Software Engineer — NeoSoft Technologies (client: Edelweiss Financial Services)", dates: "04/2018 – 09/2019" },
  { title: "Programmer Analyst — Sitel India", dates: "11/2017 – 04/2018" },
  { title: "Software Engineer — Select Jobs Pvt Ltd", dates: "08/2016 – 11/2017" },
];

export default function Experience() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · experience</p>
        <h2 className="page-title">Track record, unabridged</h2>
        <p className="page-sub">
          Each role carries its complete achievement list — nothing trimmed to fit
          a summary card.
        </p>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Senior Director of Engineering, AI &amp; Data</h3>
            <span className="dates mono">01/2026 — Present</span>
          </div>
          <div className="org">SMC GROUP · MUMBAI / DELHI, INDIA</div>
          <ul>
            <li>Promoted from Director of Engineering; retained cloud-platform ownership alongside the new AI &amp; Data mandate</li>
            <li>
              Built a proprietary <b>GenAI Agent Platform</b> on Amazon Bedrock
              (Claude 3.5) with MCP, reducing context-window overhead{" "}
              <b>98.7%</b> and automating <b>60%</b> of support workloads
            </li>
            <li>
              Increased QA call-audit coverage from <b>12% to 100%</b>; replaced{" "}
              <b>38%</b> of manual collection calls with autonomous AI voice bots
            </li>
            <li>
              Stood up self-hosted LLM infrastructure — GPU cluster, LoRA/QLoRA
              fine-tuning, LiteLLM governance; AIOps RCAs cut incident diagnosis
              time <b>~92%</b> (2 hrs → under 10 min)
            </li>
            <li>Established an enterprise Medallion Lakehouse (Apache Iceberg, AWS Glue, S3) with ACID time-travel auditing for SEBI compliance</li>
            <li>
              Built <b>Piper</b>, a Customer 360 CDP, and a zero-loss real-time
              reconciliation engine — <b>50%</b> improvement in customer
              engagement
            </li>
          </ul>
        </div>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Director of Engineering, Cloud &amp; Platform</h3>
            <span className="dates mono">09/2023 — 01/2026</span>
          </div>
          <div className="org">SMC GROUP · DELHI, INDIA</div>
          <ul>
            <li>
              Orchestrated a 30-month digital overhaul from legacy on-prem to
              hybrid cloud, powering the &quot;SmartTrader&quot; launch (
              <b>₹30 Cr+</b> client fee savings)
            </li>
            <li>
              Architected &quot;10x-ready&quot; infrastructure scaling daily
              orders <b>10K → 700K+ (70×)</b> in under 10 months; managed a{" "}
              <b>₹100 Cr+</b> technology budget
            </li>
            <li>Delivered <b>0.40ms</b> market-data latency via Direct Connect + Transit Gateway Multicast + GRE ingestion of NSE/BSE/MCX feeds</li>
            <li>Sustained <b>99.99%</b> uptime at peak volatility; solved &quot;thundering herd&quot; surges via WebSocket scaling on Amazon ECS</li>
            <li>Implemented a FinOps framework and AWS MAP vendor negotiation for <b>29–40%</b> annualized cost savings; governed ~130 AWS accounts (~$1.2M TCO)</li>
            <li>Hardened security/compliance: CloudHSM, AWS WAF, EDR/XDR/MDR, SIEM/SOC, IaC (Terraform/Pulumi/OpenTofu); key contributor to ISO 27001 &amp; SEBI audits</li>
          </ul>
        </div>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Engineering Manager</h3>
            <span className="dates mono">01/2023 — 09/2023</span>
          </div>
          <div className="org">SCRUT AUTOMATION · BENGALURU, INDIA</div>
          <ul>
            <li>Led a cross-functional organization of <b>42</b> (Product, Platform, QA, DevOps, Support)</li>
            <li>Delivered <b>$360K (30%+)</b> annualized savings via a custom FinOps framework and serverless migration</li>
            <li>Directed the GRC framework engineering roadmap for global enterprise clients; spearheaded SaaS deployment across European and US markets</li>
            <li>Redesigned AWS infrastructure with a multi-region, multi-zone strategy; resolved critical DynamoDB bottlenecks at scale</li>
          </ul>
        </div>

        <div className="role-full">
          <div className="role-full-head">
            <h3>Principal Architect</h3>
            <span className="dates mono">02/2022 — 01/2023</span>
          </div>
          <div className="org">BYJU&apos;S (THINK &amp; LEARN GROUP) · MUMBAI, INDIA</div>
          <ul>
            <li>Delivered <b>~$1.464M (30%+)</b> in annualized savings through Cloud Cost Optimization and FinOps</li>
            <li>Reduced production incidents <b>80%</b>; secured infrastructure for high-traffic events including the FIFA World Cup sponsorship</li>
            <li>
              Developed an in-house AI/ML post-call auditing solution, raising
              coverage from <b>6% to 100%</b> and cutting escalations{" "}
              <b>70%</b>
            </li>
            <li>Transitioned CI/CD from Jenkins to GitHub Actions; moved infrastructure from bare-metal to EKS/ECS for zero downtime</li>
            <li>Re-architected the VPC network for private link, peering, and NAT; hardened perimeter with Cloudflare WAF</li>
          </ul>
        </div>

        <div className="early-career">
          <h2 className="page-title" style={{ fontSize: "20px", marginBottom: "16px" }}>
            Early Career
          </h2>
          {EARLY_CAREER.map((role) => (
            <div className="early-row" key={role.title}>
              <span>{role.title}</span>
              <span className="e-meta">{role.dates}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
