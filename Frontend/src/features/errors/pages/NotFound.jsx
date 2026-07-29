import { Link } from "react-router";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.subtitle}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            Back to Home
          </Link>
          <Link to="/dashboard" className={styles.secondaryBtn}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;