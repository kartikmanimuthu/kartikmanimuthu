import React from "react";
import SiteLayout from "../components/layout/SiteLayout";
import Chip from "../components/ui/Chip";

interface Project {
  name: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
}

const PROJECTS: Project[] = [
  {
    name: "Scrut GRC Platform (SaaS)",
    description:
      "A comprehensive B2B SaaS platform merging Governance, Risk, and Compliance (GRC) functionality — real-time risk monitoring across multi-cloud infrastructure with deep integration across 70+ apps.",
    stack: ["Docker", "Kubernetes", "Terraform", "Golang", "Next.js", "Python", "RabbitMQ", "AWS", "AWS DynamoDB", "AWS SQS", "Cognito", "CodePipeline", "Jenkins", "ECS", "Selenium"],
    links: [
      { label: "Platform ↗", href: "https://app.scrut.io" },
      { label: "Website ↗", href: "https://www.scrut.io" },
    ],
  },
  {
    name: "BYJU's Post Call Analytics (PCA)",
    description:
      "An AI/ML and NLP-driven call-auditing system enabling 80% audit coverage of 120K daily calls with only 2 personnel, versus the prior 7% coverage with 20 staff. Delivers real-time sentiment analysis and data-driven agent ratings.",
    stack: ["Python", "Node.js", "Grafana K6", "React.js", "Playwright", "AWS Transcribe", "AWS Comprehend", "AWS Glue", "AWS Athena", "AWS Quicksight", "AWS CDK", "AWS Lambda", "AWS StepFunction", "AWS EventBridge", "AWS ECS", "AWS S3", "AWS SQS", "AWS SNS", "AWS Dynamodb"],
    links: [
      { label: "Platform ↗", href: "https://pca.byjusorders.com" },
      { label: "Website ↗", href: "https://byjus.com/" },
    ],
  },
  {
    name: "BYJU's User Management & Configuration System for B2B",
    description:
      "A unified identity, access-management, and configuration-management system for the B2B landscape, giving organizations centralized control over user roles and core configuration.",
    stack: ["React.js", "Node.js", "AWS API Gateway", "AWS Cognito", "Lambda", "S3", "Docker", "ECS Fargate", "GitHub Actions", "Lerna", "AWS RDS Aurora", "MongoAtlas", "Confluent Kafka", "AWS Batch", "Datadog", "ELK", "Redis", "K6", "Vercel"],
    links: [
      { label: "Platform ↗", href: "https://users.byjusorders.com" },
      { label: "Website ↗", href: "https://byjus.com/" },
    ],
  },
  {
    name: "Legal Babu: Digital Transformation of Legal Services",
    description:
      "A digital platform reimagining legal-service delivery in India — bridging technology and legal expertise to make legal solutions simple, affordable, and accessible.",
    stack: ["MicroFrontend", "Strapi", "Next.js", "React.js", "Material UI", "Webpack", "Rollup", "SASS/SCSS", "GraphQL", "Node.js", "MongoDb", "Docker", "Kubernetes", "Redis", "BullMQ", "RabbitMQ", "WebSockets", "AWS EC2", "AWS", "CloudFront", "S3"],
    links: [{ label: "Website ↗", href: "https://www.legalbabu.com" }],
  },
];

export default function Projects() {
  return (
    <SiteLayout>
      <div className="wrap" style={{ paddingTop: "8px", paddingBottom: "20px" }}>
        <p className="eyebrow">page · projects</p>
        <h2 className="page-title">Projects</h2>

        {PROJECTS.map((project) => (
          <section className="about-section" key={project.name}>
            <h3 style={{ fontSize: "19px", marginBottom: "10px" }}>{project.name}</h3>
            <p>{project.description}</p>
            <div className="chips" style={{ borderTop: "none", paddingTop: 0, marginBottom: "14px" }}>
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: "12px" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
