import { useState } from "react";
import FAQItem from "./components/FAQItem";
import useFAQReveal from "./hooks/useFAQReveal";
import styles from "./FAQ.module.scss";

// Placeholder data — edit freely, add/remove entries as needed.
// Just keep each id unique; the list scales automatically.
const FAQ_DATA = [
  {
    id: "faq-1",
    question: "What is HikariCV and how does it work?",
    answer:
      "HikariCV analyzes your resume against real job descriptions using AI, then gives you a detailed score, section-by-section feedback, and interview practice tailored to the role you're applying for.",
  },
  {
    id: "faq-2",
    question: "Is my resume data kept private?",
    answer:
      "Yes. Your resume is only used to generate your analysis and coaching sessions. We don't sell your data or share it with third parties.",
  },
  {
    id: "faq-3",
    question: "Do I need to pay to try it out?",
    answer:
      "You can run your first resume analysis for free. Paid plans unlock unlimited scans, deeper feedback, and full mock interview sessions.",
  },
  {
    id: "faq-4",
    question: "Which file formats are supported?",
    answer:
      "You can upload PDF or DOCX resumes. We recommend PDF for the most accurate parsing and formatting detection.",
  },
  {
    id: "faq-5",
    question: "How accurate is the AI feedback?",
    answer:
      "Our scoring model is trained on real recruiter criteria and thousands of successful resumes, so feedback closely mirrors what an actual hiring manager would look for.",
  },
  {
    id: "faq-6",
    question: "Can I practice interviews for a specific job posting?",
    answer:
      "Yes. Paste in a job description and HikariCV generates interview questions and coaching feedback specific to that role.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const { sectionRef, addItemRef } = useFAQReveal(FAQ_DATA.length);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} className={styles.faq} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.title}>Frequently asked questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know before you get started. Can&apos;t
            find your answer? Reach out to our team.
          </p>
        </div>

        <div className={styles.list}>
          {FAQ_DATA.map((item) => (
            <FAQItem
              key={item.id}
              itemRef={addItemRef}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
