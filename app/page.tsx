// import { Sidebar } from '@/components/sidebar';
// import ProtectedLayout from "../components/ProtectedLayout"

// export default function Home() {
//   return (
//     // <ProtectedLayout>
//     // <Sidebar>
//     <>
//       <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8 text-center">
//           <div>
//             <h1 className="text-4xl font-bold tracking-tight text-foreground">
//               Welcome to HomeOS
//             </h1>
//             <p className="mt-4 text-lg text-muted-foreground">
//               Your intelligent home management platform
//             </p>
//           </div>
          
//           <div className="mt-8 space-y-4">
//             <a
//               href="/login"
//               className="block w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
//             >
//               Get Started
//             </a>
//             {/* <a
//               href="/signup"
//               className="block w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
//             >
//               Create Account
//             </a> */}
//           </div>
//         </div>
//       </div>
      
//     {/* </Sidebar> */}
//     {/* // </ProtectedLayout> */}
//     </>
//   );
// }


// app/page.jsx
"use client"; // This page needs client-side features like useState, useEffect, AnimatePresence

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingSpinner from '../components/WebsiteUI/LoadingSpinne';
 import Navbar from '../components/WebsiteUI/Navbar';
import Image from 'next/image'; // Use Next.js Image component for optimization
import { useTheme } from 'next-themes'; // To control theme colors

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { theme } = useTheme(); // Get current theme

  const texts = [
    "Helping You Make Time For More",
    "We simplify everyday living",
    "By handling your household tasks, so you have time for what matters.",
    "From trusted help to smart solutions, we make your home work for you."
  ];

  // Tailwind CSS classes for background colors
  const backgroundClasses = [
    'bg-[#5C5750] dark:bg-gray-900', // Living room background color (approximation)
    'bg-white dark:bg-gray-800',     // White background
    'bg-orange-500 dark:bg-orange-700', // Orange background
    'bg-[#5C5750] dark:bg-gray-900', // Back to living room bg or similar for last text
  ];

  // Tailwind CSS classes for text colors
  const textColorClasses = [
    'text-white dark:text-white', // For living room background
    'text-gray-800 dark:text-white', // For white background
    'text-white dark:text-white',     // For orange background
    'text-white dark:text-white', // For final text
  ];

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 3000); // Change text every 3 seconds
      return () => clearInterval(textInterval);
    }
  }, [isLoading, texts.length]);

  const backgroundVariants = {
    // We'll apply background changes directly via Tailwind classes
    // and rely on a 'key' prop for the motion.div to re-render for smooth transitions.
    // For smoother background color transitions, you might need a separate div
    // or animate `backgroundColor` directly if not using `key`.
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Website Revamp - Pinch</title>
        <meta name="description" content="Helping you make time for more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingSpinner onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          key={currentTextIndex} // Key helps trigger background animation on content change
          className={`min-h-screen flex flex-col items-center justify-center relative transition-colors duration-1000 ${backgroundClasses[currentTextIndex]}`}
        >
          <Navbar />

          {/* Background image for the first section */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentTextIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('/images/living-room.jpg')` }}
          ></div>

          <main className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTextIndex} // Important for Framer Motion to re-animate
                className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl ${textColorClasses[currentTextIndex]} text-shadow-md md:text-shadow-lg`}
               // variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {texts[currentTextIndex]}
              </motion.h1>
            </AnimatePresence>
          </main>
        </motion.div>
      )}
    </>
  );
}