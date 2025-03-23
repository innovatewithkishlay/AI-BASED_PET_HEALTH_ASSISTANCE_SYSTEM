import React from "react";
import { motion } from "framer-motion";

const CustomToast = ({ type, message }) => {
  const backgroundColor = type === "success" ? "#E0F7E9" : "#FDE8E8";
  const textColor = type === "success" ? "#2E7D32" : "#C62828";
  const icon = type === "success" ? "✔️" : "❌";

  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
      style={{ backgroundColor, color: textColor }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="text-lg">{icon}</div>

      <div className="text-sm font-medium">{message}</div>
    </motion.div>
  );
};

export default CustomToast;
