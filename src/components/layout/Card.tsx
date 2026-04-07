import { motion } from 'framer-motion';
import { joinClasses } from '@/lib/classes';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animated?: boolean;
}

export function Card({ children, className, hover = true, animated = false }: CardProps) {
  const content = (
    <section
      className={joinClasses(
        'rounded-2xl border border-white/50 bg-white/75 p-6 shadow-soft backdrop-blur-lg transition-all duration-200',
        hover && 'hover:-translate-y-1 hover:shadow-soft-lg hover:border-white/60',
        className
      )}
    >
      {children}
    </section>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
