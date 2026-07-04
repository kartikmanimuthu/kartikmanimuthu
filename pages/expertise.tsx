import React from "react";
import SiteLayout from "../components/layout/SiteLayout";
import Chip from "../components/ui/Chip";
import { CloudIcon, AiIcon, DataIcon } from "../components/ui/PillarIcons";

export default function Expertise() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · expertise</p>
        <h2 className="page-title">Three disciplines, in full</h2>
        <p className="page-sub">
          Every pillar below mirrors the structure of my actual working notes —
          grouped into sub-categories, not flattened into a handful of headline
          bullets.
        </p>

        <div className="pillar-full pillar--cloud" id="cloud">
          <div className="pillar-head">
            <CloudIcon className="pillar-icon" />
            <h3>Cloud &amp; Platform Engineering</h3>
          </div>
          <div className="group-grid">
            <div className="group">
              <p className="group-k">Strategic Transformation &amp; Capacity</p>
              <ul>
                <li>
                  Orchestrated a <b>30-month digital overhaul</b> transitioning a
                  30-year-old institution from legacy on-prem to hybrid cloud,
                  powering the &quot;SmartTrader&quot; launch (<b>₹30 Cr+</b> client
                  fee savings)
                </li>
                <li>
                  Architected &quot;10x-ready&quot; infrastructure scaling daily
                  orders <b>10K → 700K+ (70×)</b> within 10 months; migrated{" "}
                  <b>~900 servers</b> to AWS
                </li>
                <li>
                  Managed a <b>₹100 Cr+</b> technology investment budget, aligning
                  roadmaps to business KPIs
                </li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">High-Performance &amp; Low-Latency Systems</p>
              <ul>
                <li>
                  Designed a hybrid ingestion engine — Direct Connect + Transit
                  Gateway Multicast + GRE — for NSE/BSE/MCX feeds at{" "}
                  <b>0.40ms</b> latency (~90% reduction)
                </li>
                <li>
                  Eliminated &quot;thundering herd&quot; login surges via WebSocket
                  management on Amazon ECS, sustaining <b>99.99% uptime</b> for
                  hundreds of thousands of concurrent traders
                </li>
                <li>Re-architected marketing/static sites to render via CDN for caching and performance</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">FinOps, Networking &amp; Multi-Account</p>
              <ul>
                <li>
                  Implemented a FinOps framework and AWS MAP vendor negotiation for{" "}
                  <b>29–40%</b> annualized cost savings — <i>FinOps Leader of the
                  Year, 2025</i>
                </li>
                <li>
                  Governed <b>~130 AWS accounts</b> via Control Tower; ran a{" "}
                  <b>~900-server estate at ~$1.2M TCO</b>
                </li>
                <li>Designed the hybrid network backbone — hub-and-spoke, Transit Gateway, Direct Connect, VPN tunnels</li>
                <li>Earned AWS Well-Architected qualification ($6,000 in credits)</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Security, Compliance &amp; Reliability</p>
              <ul>
                <li>Built an in-house DevSecOps program with IaC SecOps gates in CI/CD, cutting MTTR materially</li>
                <li>Deployed CloudHSM-backed KMS, AWS WAF, and led EDR/XDR/MDR + SIEM/SOC adoption</li>
                <li>Standardized IaC org-wide (Terraform, Pulumi, OpenTofu); deployed a self-hosted LGTM observability stack with AIOps-driven incident response</li>
                <li>Key contributor to <b>ISO 27001</b> and <b>SEBI</b> compliance audits</li>
              </ul>
            </div>
          </div>
          <div className="chips">
            <Chip pillar="cloud">AWS</Chip>
            <Chip pillar="cloud">Transit Gateway</Chip>
            <Chip pillar="cloud">Direct Connect</Chip>
            <Chip pillar="cloud">Amazon ECS</Chip>
            <Chip pillar="cloud">Control Tower</Chip>
            <Chip pillar="cloud">CloudHSM</Chip>
            <Chip pillar="cloud">AWS WAF</Chip>
            <Chip pillar="cloud">Terraform</Chip>
            <Chip pillar="cloud">Pulumi</Chip>
            <Chip pillar="cloud">OpenTofu</Chip>
            <Chip pillar="cloud">LGTM</Chip>
            <Chip pillar="cloud">FinOps</Chip>
          </div>
        </div>

        <div className="pillar-full pillar--ai" id="ai">
          <div className="pillar-head">
            <AiIcon className="pillar-icon" />
            <h3>AI / ML &amp; Applied GenAI</h3>
          </div>
          <div className="group-grid">
            <div className="group">
              <p className="group-k">Model Training, Fine-Tuning &amp; Alignment</p>
              <ul>
                <li>
                  Built an end-to-end fine-tuning pipeline for open-weight models
                  (<b>Gemma 2, Qwen2.5, Llama</b>) using <b>LoRA/QLoRA</b> on
                  curated golden datasets
                </li>
                <li>Engineered an &quot;online golden-dataset&quot; flywheel — production traffic → review → curated SFT/preference pairs → scheduled retraining</li>
                <li>Applied preference-based alignment (<b>DPO/RLHF/RLAIF</b>) to steer models to domain tone and compliance constraints</li>
                <li>Stood up an evaluation harness — golden-set scoring, LLM-as-judge, red-teaming — as a production promotion gate</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Model Compression &amp; Efficient Serving</p>
              <ul>
                <li>Led model compression — quantization (INT8/INT4, GPTQ/AWQ/GGUF), distillation, pruning — to fit larger models onto smaller GPUs (L4/A10G vs. A100-class)</li>
                <li>Optimized throughput with <b>vLLM/TensorRT-LLM</b>, paged KV-cache, continuous batching, and speculative decoding</li>
                <li>Ran a right-sized GPU serving cluster on AWS ECS with autoscaling across training and inference workloads</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Self-Hosted Inference — Cost &amp; Compliance</p>
              <ul>
                <li>Replaced third-party API inference with fully self-hosted, in-VPC models to meet SEBI data-residency requirements</li>
                <li>Centralized model access via a <b>LiteLLM</b> gateway — unified auth, routing, rate limiting, cost attribution, audit logging</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Applied GenAI Products</p>
              <ul>
                <li>
                  Architected a proprietary <b>GenAI Agent Platform</b> on{" "}
                  <b>Amazon Bedrock (Claude 3.5)</b> with <b>MCP</b> —{" "}
                  <b>98.7%</b> less context overhead, <b>60%</b> of support
                  workloads automated
                </li>
                <li>
                  Shipped a <b>RAG</b> assistant (LangChain/LangGraph); built an
                  AIOps self-healing platform cutting incident RCA time ~92%
                  (2 hrs → &lt;10 min)
                </li>
                <li>
                  Automated compliance ops: AI voice bots replaced <b>38%</b> of
                  manual collection calls; QA audit coverage scaled{" "}
                  <b>12% → 100%</b>
                </li>
                <li>Built a PyTorch signature-verification model and a GenAI portfolio analyzer; delivered predictive (Prophecy) and operational (MOTIF) ML platforms</li>
              </ul>
            </div>
          </div>
          <div className="chips">
            <Chip pillar="ai">Amazon Bedrock</Chip>
            <Chip pillar="ai">Claude 3.5</Chip>
            <Chip pillar="ai">MCP</Chip>
            <Chip pillar="ai">LangGraph</Chip>
            <Chip pillar="ai">RAG</Chip>
            <Chip pillar="ai">LoRA/QLoRA</Chip>
            <Chip pillar="ai">DPO/RLHF</Chip>
            <Chip pillar="ai">vLLM</Chip>
            <Chip pillar="ai">TensorRT-LLM</Chip>
            <Chip pillar="ai">LiteLLM</Chip>
            <Chip pillar="ai">PyTorch</Chip>
            <Chip pillar="ai">AIOps</Chip>
          </div>
        </div>

        <div className="pillar-full pillar--data" id="data">
          <div className="pillar-head">
            <DataIcon className="pillar-icon" />
            <h3>Data Engineering</h3>
          </div>
          <div className="group-grid">
            <div className="group">
              <p className="group-k">Lakehouse &amp; Data Platform (0-to-1)</p>
              <ul>
                <li>
                  Established an enterprise <b>Medallion Lakehouse</b>
                  (Bronze/Silver/Gold) on <b>Apache Iceberg, AWS Glue, S3</b> with
                  ACID-compliant, time-travel auditing for <b>SEBI</b> compliance
                </li>
                <li>Architected the open-source pipeline — DLT ingestion, dbt transformation, Parquet + Delta Lake with Lake Formation governance, Presto/Athena query — orchestrated by <b>Airflow</b>, self-hosted on AWS EKS</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Real-Time Data &amp; Governance</p>
              <ul>
                <li>Developed a fault-tolerant real-time reconciliation engine (microservices + <b>ElastiCache</b>) with zero tolerance for packet loss</li>
                <li>Enforced data modeling, lineage, and auditability with dbt + Spark and <b>OpenMetadata</b>, meeting SEBI standards</li>
                <li>Delivered a semantic layer (<b>Cube.js</b>) for embedded analytics, surfaced through Metabase for BI</li>
              </ul>
            </div>
            <div className="group">
              <p className="group-k">Data Products</p>
              <ul>
                <li>
                  Led the build of <b>Piper</b>, a Customer Data Platform
                  (Customer 360) — <b>50%</b> improvement in customer engagement
                </li>
                <li>Provided the data substrate for predictive (Prophecy) and operational (MOTIF) analytics platforms</li>
              </ul>
            </div>
          </div>
          <div className="chips">
            <Chip pillar="data">Apache Iceberg</Chip>
            <Chip pillar="data">AWS Glue</Chip>
            <Chip pillar="data">Amazon S3</Chip>
            <Chip pillar="data">dbt</Chip>
            <Chip pillar="data">DLT</Chip>
            <Chip pillar="data">Airflow</Chip>
            <Chip pillar="data">Cube.js</Chip>
            <Chip pillar="data">OpenMetadata</Chip>
            <Chip pillar="data">ElastiCache</Chip>
            <Chip pillar="data">Metabase</Chip>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
