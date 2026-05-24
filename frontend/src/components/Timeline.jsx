import { motion } from 'motion/react';

export default function Timeline({ entries = [] }) {
  if (!entries.length) return null;

  return (
    <div className="timeline">
      <div className="timeline__line" />
      {entries.map((entry, index) => {
        const type = (entry.type || 'work').toLowerCase();
        return (
          <motion.div
            key={entry.id || index}
            className="timeline__entry"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <div className={`timeline__dot timeline__dot--${type}`} />
            <div className="timeline__card">
              <span className={`timeline__badge timeline__badge--${type}`}>
                {type === 'education' ? 'Education' : 'Work'}
              </span>
              <h3 className="timeline__title">{entry.title}</h3>
              {entry.organization && (
                <p className="timeline__org">{entry.organization}</p>
              )}
              {(entry.start_date || entry.end_date) && (
                <p className="timeline__date">
                  {entry.start_date} {entry.end_date ? `— ${entry.end_date}` : '— Present'}
                </p>
              )}
              {entry.description && (
                <p className="timeline__description">{entry.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
