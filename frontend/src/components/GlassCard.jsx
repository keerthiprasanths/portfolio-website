import { motion } from 'motion/react';

export default function GlassCard({ children, className = '', gradient = false, hover = true }) {
  return (
    <motion.div
      className={`glass-card-component ${gradient ? 'glass-card-component--gradient' : ''} ${hover ? 'glass-card-component--hover' : ''} ${className}`}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
