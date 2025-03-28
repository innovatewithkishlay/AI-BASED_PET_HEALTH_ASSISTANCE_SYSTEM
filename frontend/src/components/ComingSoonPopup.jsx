import React from "react";
import { motion } from "framer-motion";

const ComingSoonPopup = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      Coming Soon!
    </motion.div>
  );
};

export default ComingSoonPopup;
