// ===========================
//  PER-PAGE SEO CONFIGURATION
// ===========================

const SITE_URL = "https://hikari-cv.vercel.app";

export const homeSEO = {
  title: null, // uses default "HikariCV — AI-Powered Resume Builder & Interview Prep"
  description:
    "Build ATS-optimized resumes, practice with AI mock interviews, and get real-time performance analytics. HikariCV is your AI-powered career coach.",
  path: "/",
  keywords:
    "AI resume builder, AI interview prep, mock interviews, ATS resume, career coach, AI career tools, resume optimizer, HikariCV",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HikariCV",
    url: SITE_URL,
    description:
      "AI-powered career platform for building ATS-optimized resumes and practicing mock interviews with real-time analytics.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Mohit Raghav",
      url: "https://github.com/mohitraghav1318",
      sameAs: [
        "https://x.com/mohitraghav1318",
        "https://linkedin.com/in/mohitraghav1318",
        "https://github.com/mohitraghav1318",
      ],
    },
  },
};

export const aboutSEO = {
  title: "About Us",
  description:
    "Meet the team behind HikariCV. We're democratizing career success through intelligent empathy and AI-powered tools for resume building and interview preparation.",
  path: "/about",
  keywords:
    "HikariCV team, about HikariCV, AI career platform, Mohit Raghav, career tech startup",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About HikariCV",
    url: `${SITE_URL}/about`,
    description:
      "Learn about HikariCV's mission to empower candidates with AI-driven career tools.",
    mainEntity: {
      "@type": "Organization",
      name: "HikariCV",
      url: SITE_URL,
      founder: {
        "@type": "Person",
        name: "Mohit Raghav",
        jobTitle: "Web Developer",
        sameAs: [
          "https://x.com/mohitraghav1318",
          "https://linkedin.com/in/mohitraghav1318",
          "https://github.com/mohitraghav1318",
        ],
      },
      sameAs: [
        "https://x.com/mohitraghav1318",
        "https://github.com/mohitraghav1318",
      ],
    },
  },
};

export const pricingSEO = {
  title: "Pricing",
  description:
    "Explore HikariCV pricing plans — from a free starter tier to pro AI interview coaching. Find the plan that fits your career goals.",
  path: "/pricing",
  keywords:
    "HikariCV pricing, AI interview prep cost, resume builder pricing, career tool plans, free AI interview practice",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HikariCV Pricing",
    url: `${SITE_URL}/pricing`,
    description:
      "Choose your HikariCV plan for AI-powered resume building and interview preparation.",
  },
};

export const docsSEO = {
  title: "Documentation",
  description:
    "HikariCV developer and user documentation. Learn how to integrate AI interview prep, build resumes, and use our API for mock interview simulations.",
  path: "/docs",
  keywords:
    "HikariCV docs, HikariCV API, AI interview API, resume builder documentation, developer guide, mock interview SDK",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "HikariCV Documentation",
    url: `${SITE_URL}/docs`,
    description:
      "Complete documentation for HikariCV — setup guides, API reference, and integration tutorials.",
    author: {
      "@type": "Organization",
      name: "HikariCV",
    },
  },
};
