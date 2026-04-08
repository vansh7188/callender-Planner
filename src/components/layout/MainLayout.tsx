"use client";

import { motion } from 'framer-motion';
import { joinClasses } from '@/lib/classes';

interface MainLayoutProps {
  children: React.ReactNode;
  accentTint?: string;
}

export function MainLayout({ children, accentTint }: MainLayoutProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto min-h-screen max-w-7xl overflow-x-hidden px-3 py-4 pb-36 sm:px-6 sm:py-6 lg:px-8 lg:py-12"
    >
      {/* Accent gradient blur */}
      <div
        className={joinClasses('pointer-events-none absolute inset-x-0 top-4 -z-10 mx-auto h-48 w-[100%] rounded-full blur-3xl opacity-50 sm:top-6 sm:h-64 sm:w-[92%] sm:opacity-60')}
        style={{ background: accentTint }}
      />

      {/* Premium container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative grid gap-5 sm:gap-7"
      >
        {children}
      </motion.div>
    </motion.main>
  );
}
