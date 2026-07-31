import { useRef } from "react";
import gsap from "gsap";
import styles from "./FAQItem.module.scss";

const FAQItem = ({ question, answer, isOpen, onToggle, itemRef }) => {
  const answerRef = useRef(null);
  const contentRef = useRef(null);

  const handleToggle = () => {
    const answerEl = answerRef.current;
    const contentEl = contentRef.current;

    if (answerEl && contentEl) {
      if (!isOpen) {
        const height = contentEl.scrollHeight;
        gsap.fromTo(
          answerEl,
          { height: 0, opacity: 0 },
          { height, opacity: 1, duration: 0.45, ease: "power2.out" }
        );
      } else {
        gsap.to(answerEl, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
      }
    }

    onToggle();
  };

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
    >
      <button
        type="button"
        className={styles.question}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className={styles.icon} aria-hidden="true">
          <span className={styles.iconLineHorizontal} />
          <span className={styles.iconLineVertical} />
        </span>
      </button>

      <div
        ref={answerRef}
        className={styles.answer}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <p ref={contentRef} className={styles.answerText}>
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
