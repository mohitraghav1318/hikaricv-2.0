import { Helmet } from "react-helmet-async";

const SITE_URL = "https://hikari-cv.vercel.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = "@mohitraghav1318";

const defaults = {
  title: "HikariCV — AI-Powered Resume Builder & Interview Prep",
  description:
    "Build ATS-optimized resumes, practice with AI mock interviews, and get real-time performance analytics. Your AI career coach powered by the latest language models.",
  keywords:
    "AI resume builder, AI interview prep, mock interviews, ATS resume, career coach, AI career tools, resume optimizer, interview practice, HikariCV",
};

/**
 * Reusable SEO component for per-page meta management.
 *
 * @param {object} props
 * @param {string}  props.title       — Page title (appended with "| HikariCV")
 * @param {string}  props.description — Meta description
 * @param {string}  props.path        — Path for canonical URL (e.g. "/about")
 * @param {string}  props.keywords    — Comma-separated keywords
 * @param {string}  props.ogImage     — Open Graph image URL
 * @param {string}  props.ogType      — Open Graph type (default: "website")
 * @param {object}  props.jsonLd      — JSON-LD structured data object
 */
const SEO = ({
  title,
  description,
  path = "",
  keywords,
  ogImage,
  ogType = "website",
  jsonLd,
}) => {
  const pageTitle = title
    ? `${title} | HikariCV`
    : defaults.title;
  const pageDescription = description || defaults.description;
  const pageKeywords = keywords || defaults.keywords;
  const canonicalUrl = `${SITE_URL}${path}`;
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:site_name" content="HikariCV" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
