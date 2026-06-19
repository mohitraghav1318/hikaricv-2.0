// ===========================
//  DOCS DATA — Layer 1
// ===========================

export const sidebarSections = [
  {
    id: "documentation",
    label: "Documentation",
    items: [
      { id: "getting-started", label: "Getting Started", icon: "rocket_launch", active: true },
      { id: "ai-profile-setup", label: "AI Profile Setup", icon: "person_search" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { id: "resume-builder", label: "Resume Builder", icon: "description" },
      { id: "mock-interviews", label: "Mock Interviews", icon: "forum" },
      { id: "skill-assessment", label: "Skill Assessment", icon: "analytics" },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    items: [
      { id: "api-reference", label: "API Reference", icon: "api" },
      { id: "webhooks", label: "Webhooks", icon: "webhook" },
    ],
  },
];

export const bentoCards = [
  {
    id: "quick-setup",
    icon: "magic_button",
    iconBg: "primary",
    title: "Quick Setup",
    description:
      "Configure your candidate profile in under 5 minutes with our automated LinkedIn importer.",
    linkText: "Read Step-by-Step Guide",
  },
  {
    id: "api-integration",
    icon: "integration_instructions",
    iconBg: "tertiary",
    title: "API Integration",
    description:
      "Embed our mock interview engine directly into your HR platform using our RESTful API.",
    linkText: "View API Docs",
  },
];

export const steps = [
  {
    id: 1,
    title: "Define the Job Description",
    description:
      "Paste the JD of your target role. Our AI analyzes the specific keywords, required years of experience, and technical stack to tailor the questions.",
    code: `POST /api/v1/sessions/create\n{ "role": "Senior Frontend Engineer", "company": "TechCorp" }`,
    badges: [],
    active: true,
  },
  {
    id: 2,
    title: "Calibrate Voice Settings",
    description:
      'Choose the AI interviewer persona that matches your industry. From "Rigorous Technical" to "Supportive Culture-Fit," customize the vibe of your prep.',
    code: null,
    badges: [],
  },
  {
    id: 3,
    title: "Review AI Analysis",
    description:
      "Get instant feedback on your tone, pacing, and content accuracy. AI scores your answers against industry benchmarks.",
    code: null,
    badges: [
      { label: "Confidence Score: 88%", variant: "primary" },
      { label: "Clarity: High", variant: "tertiary" },
      { label: "Tech Depth: Pro", variant: "secondary" },
    ],
  },
];

export const heroContent = {
  title: "Getting Started with InterviewAI",
  description:
    "Welcome to the InterviewAI developer and user guide. This documentation will help you integrate AI-powered interview prep into your workflow, from crafting the perfect resume to mastering real-time voice mocks.",
  breadcrumbs: [
    { label: "Docs", href: "#" },
    { label: "Getting Started", href: null },
  ],
};
