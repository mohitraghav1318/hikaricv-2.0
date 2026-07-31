import { Link } from "react-router";
import useNotFoundAnimation from "./hooks/useNotFoundAnimation";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const {
    wrapperRef,
    contentRef,
    blobOneRef,
    blobTwoRef,
    digitRefs,
    handleBtnEnter,
    handleBtnLeave,
  } = useNotFoundAnimation();

  return (
    <section ref={wrapperRef} className={styles.wrapper}>
      <div ref={blobOneRef} className={styles.blobOne} aria-hidden="true" />
      <div ref={blobTwoRef} className={styles.blobTwo} aria-hidden="true" />

      <div ref={contentRef} className={styles.content}>
        <div className={styles.codeWrap}>
          {["4", "0", "4"].map((digit, i) => (
            <span
              key={i}
              ref={(el) => (digitRefs.current[i] = el)}
              className={styles.digit}
            >
              {digit}
            </span>
          ))}
          <span className={styles.scanline} aria-hidden="true" />
        </div>

        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.subtitle}>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className={styles.actions}>
          <Link
            to="/"
            className={styles.primaryBtn}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            Back to Home
          </Link>
          <Link
            to="/dashboard"
            className={styles.secondaryBtn}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
