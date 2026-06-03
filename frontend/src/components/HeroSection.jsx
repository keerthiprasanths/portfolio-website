import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiChevronDown } from 'react-icons/fi';

const floatingCards = [
  { emoji: '🎨', label: 'Design', delay: 0 },
  { emoji: '🎬', label: 'Video', delay: 0.2 },
  { emoji: '✨', label: 'Motion', delay: 0.4 },
];

export default function HeroSection() {
  const [typewriterDone, setTypewriterDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTypewriterDone(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      {/* Animated gradient mesh background */}
      <div className="hero__mesh">
        <div className="hero__mesh-orb hero__mesh-orb--1" />
        <div className="hero__mesh-orb hero__mesh-orb--2" />
        <div className="hero__mesh-orb hero__mesh-orb--3" />
      </div>

      <div className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          KEERTHI PRASANTH S
        </motion.h1>

        <motion.div
          className="hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className={`hero__typewriter ${typewriterDone ? 'hero__typewriter--done' : ''}`}>
            Designer &amp; Video Editor
          </span>
        </motion.div>

        <motion.div
          className="hero__cards"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {floatingCards.map((card) => (
            <motion.div
              key={card.label}
              className="hero__floating-card"
              animate={{ y: [-8, 8, -8] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.delay,
              }}
            >
              <span className="emoji">{card.emoji}</span>
              {card.label}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Link to="/portfolio" className="hero__cta">
            View My Work
          </Link>
        </motion.div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <FiChevronDown />
      </div>
    </section>
  );
}
