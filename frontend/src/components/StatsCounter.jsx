import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = parseInt(value, 10) || 0;
          const duration = 2000;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const defaultStats = [
  { label: 'Projects', value: 50, suffix: '+' },
  { label: 'Clients', value: 30, suffix: '+' },
  { label: 'Years', value: 5, suffix: '+' },
  { label: 'Views', value: 100, suffix: 'K+' },
];

export default function StatsCounter({ stats }) {
  const items = stats && stats.length ? stats : defaultStats;

  return (
    <div className="stats-grid">
      {items.map((stat, i) => (
        <motion.div
          key={stat.label || i}
          className="stats-grid__item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="stats-grid__number">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="stats-grid__label">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
