import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';

export default function BentoGrid({ projects = [], onProjectClick }) {
  if (!projects.length) return null;

  return (
    <div className="bento-grid">
      {projects.map((project, index) => (
        <motion.div
          key={project.id || index}
          className="bento-grid__item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        >
          <ProjectCard
            project={project}
            onClick={() => onProjectClick && onProjectClick(project)}
          />
        </motion.div>
      ))}
    </div>
  );
}
