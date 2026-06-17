import { motion } from "framer-motion";
import "../style/ui/loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      <motion.p
        className="loading-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;