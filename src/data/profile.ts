export const profile = {
  name: "Erlind Shpata",
  username: "erlindshpata",
  // Drop a photo in public/ (e.g. "/avatar.jpg") to replace the monogram.
  avatar: "",
  title: "Technical Lead, AI & LLM Engineering",
  shortTitle: "Technical Lead",
  tagline:
    "I build production AI systems on Google Cloud, from raw document ingestion to streamed, citation-grounded answers.",
  bio: [
    "I'm a technical lead and LLM engineer. I own the full AI stack for ReN, a financial intelligence platform powered by a purpose-built domain-specific language model (DSLM) that serves institutional B2B clients.",
    "My work covers every layer of the LLM lifecycle: unstructured data extraction, retrieval architecture, supervised fine-tuning, agentic tool-calling, streaming inference and production observability.",
    "I came up through backend engineering (Python, TypeScript, AWS, event-driven systems). That systems-first background shapes how I design AI: for scale, cost and reliability, not just accuracy on a benchmark.",
  ],
  currentCompany: "ReN",
  location: "Tirana, Albania",
  timezone: "UTC +02:00",
  email: "erlindshpata@gmail.com",
  website: "https://erlindshpata.github.io",
  social: {
    github: "https://github.com/erlindshpata",
    linkedin: "https://www.linkedin.com/in/erlind-shpata-218b0615a/",
  },
};

export const stats = [
  { value: "7+", label: "Years building backends" },
  { value: "1000s", label: "Companies in the RAG corpus" },
  { value: "5", label: "LLM lifecycle stages owned" },
  { value: "4", label: "Languages spoken" },
];

export const skillGroups = [
  {
    name: "AI / LLM engineering",
    items: [
      "RAG & intent routing",
      "Citation grounding",
      "DSLM fine-tuning (SFT)",
      "Model Context Protocol",
      "Agentic tool-calling",
      "Langfuse",
      "Streaming inference",
    ],
  },
  {
    name: "Backend",
    items: ["Python", "FastAPI", "asyncio", "Pydantic", "TypeScript", "Node.js", "Server-Sent Events"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MySQL", "Firestore", "DynamoDB", "RabbitMQ", "PDF extraction"],
  },
  {
    name: "Cloud & delivery",
    items: ["Vertex AI", "Discovery Engine", "Cloud Storage", "Firebase", "AWS Lambda", "CloudFormation", "Docker", "GitHub Actions"],
  },
];

export const pipeline = [
  {
    step: "01",
    title: "Extract",
    body: "SEC filings, annual reports and financial PDFs are parsed and normalised into structured JSON, which becomes the source of truth for everything downstream.",
  },
  {
    step: "02",
    title: "Retrieve",
    body: "An LLM intent router sends each query to real-time market data, grounded document retrieval, or both.",
  },
  {
    step: "03",
    title: "Ground",
    body: "Generated statements are mapped back to their source passages, and deep-linked citations are injected into the live stream at exact character offsets.",
  },
  {
    step: "04",
    title: "Tune",
    body: "Synthetic SFT datasets balanced across grounded, partial-answer and refusal behaviours, with automated quality control, train the domain-specific model.",
  },
  {
    step: "05",
    title: "Serve",
    body: "Multi-region routing, retries with exponential backoff and jitter, per-user cost accounting and per-request observability.",
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  note?: string;
  summary: string;
  highlights?: string[];
  stack?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Technical Lead, AI & Backend Engineering",
    company: "Diversity Economics Institute · ReN",
    period: "Jan 2026 – Present",
    location: "London, UK · Remote",
    note: "Promoted from Backend Developer (Nov 2024 – Jan 2026)",
    summary:
      "Lead AI and backend engineering for ReN, a financial intelligence assistant powered by a domain-specific language model. I set architecture direction, run code reviews, mentor the team, and own production reliability and inference cost end to end.",
    highlights: [
      "Designed and own the RAG architecture on Vertex AI: an LLM intent router over real-time market data and grounded document retrieval, with answers streamed to the client.",
      "Built the citation-grounding layer that injects verifiable, deep-linked citations into the live response stream without breaking incremental delivery.",
      "Built the synthetic SFT dataset generator and tuning workflow for ReN's DSLM, including quality control, deduplication and a held-out validation set.",
      "Moved live financial-data access from hard-coded API calls to an agentic tool-calling loop over the Model Context Protocol (MCP).",
      "Hardened inference with SDK-level retries and added per-user usage and cost accounting with subscription-tier limits.",
    ],
    stack: ["Python", "FastAPI", "Vertex AI", "Discovery Engine", "MCP", "Langfuse", "Firestore", "Docker"],
  },
  {
    role: "Backend & Cloud Engineer (Contract)",
    company: "Horizont Labs",
    period: "Jun 2019 – 2026",
    location: "London, UK",
    summary:
      "Software consultancy placing engineers on client products in fintech, social and Web3. I designed backend services and AWS infrastructure (Lambda, DynamoDB, S3, CloudFormation) with CI/CD, led delivery on client engagements, and mentored junior engineers.",
    highlights: [
      "Gather (Sep 2023 – Mar 2024): built event-driven backend infrastructure on RabbitMQ, TypeScript and PostgreSQL.",
      "iiNDYVERSE (Jan 2022 – Jul 2023): designed backend services on Node.js, PostgreSQL and AWS Lambda + DynamoDB, and advised the team on database and AWS architecture.",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "RabbitMQ", "AWS"],
  },
  {
    role: "Backend Developer",
    company: "Semos",
    period: "Jul 2019 – Nov 2020",
    location: "Tirana, Albania",
    summary: "Built backend systems focused on relational database design and operational efficiency.",
  },
];

export const education = [
  { degree: "Master's degree, Business Informatics", school: "University of Tirana", period: "2019 – 2020" },
  { degree: "Bachelor's degree, Computer Science", school: "University of Tirana", period: "2016 – 2019" },
];

export const languages = [
  { name: "Albanian", level: "Native" },
  { name: "Greek", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "German", level: "Basic" },
];

export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  url: string;
  linkLabel: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "ReN",
    kind: "Work · Financial intelligence",
    description:
      "An AI assistant for institutional investors, powered by a domain-specific language model. It answers questions about public companies with streamed, citation-grounded responses built on SEC filings, annual reports and live market data.",
    tags: ["RAG", "DSLM", "Vertex AI", "MCP", "FastAPI"],
    url: "https://app.myrenx.ai",
    linkLabel: "Visit",
    featured: true,
  },
  {
    title: "RepoAgent",
    kind: "Open source · Multi-agent",
    description:
      "An autonomous code maintainer. Give it a bug report and it retrieves the relevant code, plans a fix, edits files and runs pytest in a Docker sandbox, retrying until the tests pass.",
    tags: ["LangGraph", "ChromaDB", "Ollama / Gemini", "Docker"],
    url: "https://github.com/erlindshpata/repo-agent",
    linkLabel: "Source",
  },
  {
    title: "Interview Prep Agent",
    kind: "Open source · Grounded generation",
    description:
      "Researches a company and role with Google Search grounding, generates cited interview questions, runs an adaptive mock interview, and tracks weak skills across sessions. Available as a CLI and a Streamlit UI.",
    tags: ["Gemini", "Search grounding", "Streamlit", "Python"],
    url: "https://github.com/erlindshpata/interview-prep-agent",
    linkLabel: "Source",
  },
  {
    title: "BudgetBuddy",
    kind: "Side project · Mobile",
    description:
      "An offline-first income and expense tracker with categories, stats charts, biometric lock and data export, built on on-device SQLite.",
    tags: ["React Native", "Expo", "SQLite", "TypeScript"],
    url: "https://github.com/erlindshpata/budgetBuddy",
    linkLabel: "Source",
  },
];
