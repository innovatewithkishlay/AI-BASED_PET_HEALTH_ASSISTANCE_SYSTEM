import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQPopup = ({ onClose }) => {
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const questions = [
    {
      question: "What is AI Pet Health Assistance?",
      answer:
        "It is a platform designed to provide expert guidance and tools for pet health and wellness.",
    },
    {
      question: "How can I access the AI chatbot?",
      answer: "You need to sign up or log in to access the AI chatbot.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes, the platform offers free features, but some premium features may require a subscription.",
    },
    {
      question: "Can I track my pet's health history?",
      answer:
        "Yes, you can track your pet's health history through the platform's dashboard.",
    },
    {
      question: "How accurate is the AI's advice?",
      answer:
        "The AI provides advice based on reliable data, but it is always recommended to consult a veterinarian for critical issues.",
    },
    {
      question: "Can I add multiple pets to my account?",
      answer:
        "Yes, you can add multiple pets and manage their profiles individually.",
    },
    {
      question: "Does the platform support emergency services?",
      answer:
        "Currently, the platform does not support emergency services, but it provides guidance for common issues.",
    },
    {
      question: "What kind of data do I need to provide for my pet?",
      answer:
        "You need to provide basic details like age, breed, weight, and health history for personalized recommendations.",
    },
    {
      question: "Is my data secure on the platform?",
      answer:
        "Yes, we prioritize data security and ensure that your information is encrypted and protected.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact customer support through the 'Contact Us' section on the platform.",
    },
  ];

  // Determine which questions to display
  const visibleQuestions = showAllQuestions ? questions : questions.slice(0, 4);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close the popup when clicking outside
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg relative max-h-[80%] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
          onClick={onClose}
        >
          ✖
        </button>

        {/* FAQ Content */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {visibleQuestions.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-700">
                Q: {faq.question}
              </h3>
              <p className="text-gray-600">A: {faq.answer}</p>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAllQuestions && (
          <button
            onClick={() => setShowAllQuestions(true)}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition"
          >
            View More
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FAQPopup;
