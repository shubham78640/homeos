// components/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ onComplete }) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.5 }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[#D9D3CC] dark:bg-gray-900 flex items-center justify-center z-[9999]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={onComplete}
    >
      <motion.svg
        width="150"
        height="150"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Outer circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          stroke="white"
          strokeWidth="4"
          variants={lineVariants}
          custom={0}
        />
        {/* Wavy lines - Fine-tune these SVG paths to match the video exactly */}
        <motion.path
          d="M20 100 C 60 40, 140 40, 180 100" // Top wave
          stroke="white"
          strokeWidth="3"
          variants={lineVariants}
          custom={1}
        />
        <motion.path
          d="M20 120 C 60 60, 140 60, 180 120" // Middle wave 1
          stroke="white"
          strokeWidth="3"
          variants={lineVariants}
          custom={2}
        />
        <motion.path
          d="M20 140 C 60 80, 140 80, 180 140" // Middle wave 2
          stroke="white"
          strokeWidth="3"
          variants={lineVariants}
          custom={3}
        />
        <motion.path
          d="M20 160 C 60 100, 140 100, 180 160" // Bottom wave
          stroke="white"
          strokeWidth="3"
          variants={lineVariants}
          custom={4}
        />
      </motion.svg>
    </motion.div>
  );
};

export default LoadingSpinner;