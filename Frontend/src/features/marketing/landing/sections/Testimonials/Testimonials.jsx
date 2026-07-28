import { useRef } from "react";
import styles from "./Testimonials.module.scss";
import { useTestimonialsReveal } from "./hooks/useTestimonialsReveal";

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Switching to this workflow cut our review cycle in half. The dashboard alone paid for itself in the first month.",
    name: "Ananya Sharma",
    role: "Product Lead, Finoxa",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: 2,
    quote:
      "Support is genuinely fast and the product just works the way you'd expect it to. Zero onboarding friction for our team.",
    name: "Devraj Singh",
    role: "Founder, Loopwise",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: 3,
    quote:
      "We evaluated four tools before this one. Nothing else came close on both pricing and actual day-to-day usability.",
    name: "Meera Kapoor",
    role: "Ops Manager, Trailhead",
    rating: 4,
    avatarUrl: "",
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function StarRating({ rating = 5, max = 5 }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`${styles.star} ${i < rating ? "" : styles.empty}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  eyebrow = "Testimonials",
  heading = "Loved by teams who ship fast",
  subheading = "Don't just take our word for it — here's what people building with us have to say.",
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useTestimonialsReveal(sectionRef, gridRef);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subheading}>{subheading}</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {testimonials.map((t) => (
            <article
              key={t.id}
              className={styles.card}
              data-testimonial-card
            >
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <StarRating rating={t.rating} />
              <p className={styles.quote}>{t.quote}</p>

              <div className={styles.person}>
                <div className={styles.avatar}>
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} />
                  ) : (
                    getInitials(t.name)
                  )}
                </div>
                <div className={styles.personMeta}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
