// components/Navbar.jsx
"use client"; // This component needs client-side features like useTheme, useState

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, x: "100%", transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:px-10 py-4 bg-transparent transition-colors duration-500">
      <div className="text-2xl md:text-3xl font-bold text-white dark:text-white">
        <Link href="/">Pinch</Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8 lg:space-x-12">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-lg text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300 transition-colors duration-300">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Theme Toggle & Mobile Menu Button */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-400"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-4.275l-.707-.707M4.373 19.325l-.707-.707m15.325.707l-.707.707M4.373 4.373l-.707.707" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open mobile menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-4xl text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navLinks.indexOf(link) * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;