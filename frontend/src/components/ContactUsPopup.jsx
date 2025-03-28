import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUsPopup = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Simulate a delay for the confirmation message
    setTimeout(() => {
      setIsSubmitted(false);
      onClose(); // Close the popup after showing the confirmation
    }, 3000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close the popup when clicking outside
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg relative"
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

        {/* Contact Us Form */}
        {!isSubmitted ? (
          <>
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
              Contact Us
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Have questions or need assistance? Fill out the form below, and
              our team will get back to you shortly.
            </p>
            <form
              action={`mailto:kkishlay502@gmail.com`}
              method="POST"
              encType="text/plain"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Reason
                </label>
                <textarea
                  name="reason"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your reason for contacting us"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500 mb-4">
              Message Sent!
            </h2>
            <p className="text-gray-600 text-lg">
              Thank you for reaching out. You will be contacted by our team
              shortly.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactUsPopup;
