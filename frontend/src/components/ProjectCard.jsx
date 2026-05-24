import { motion } from 'motion/react';
import { FaDownload, FaPlay } from 'react-icons/fa';

const categoryGradients = {
  design: 'linear-gradient(135deg, #667eea, #764ba2)',
  video: 'linear-gradient(135deg, #f093fb, #f5576c)',
  motion: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  branding: 'linear-gradient(135deg, #43e97b, #38f9d7)',
};

const categoryClass = (cat) => {
  const key = (cat || '').toLowerCase();
  if (key.includes('design')) return 'design';
  if (key.includes('video')) return 'video';
  if (key.includes('motion')) return 'motion';
  if (key.includes('brand')) return 'branding';
  return 'design';
};

export default function ProjectCard({ project, onClick }) {
  const catKey = categoryClass(project.category);
  const gradient = categoryGradients[catKey] || categoryGradients.design;

  const handleDownload = (e) => {
    e.stopPropagation();
    if (project.download_url) {
      window.open(project.download_url, '_blank');
    }
  };

  return (
    <motion.div
      className="project-card"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="project-card__image-wrapper">
        {project.thumbnail_url ? (
          <img
            className="project-card__image"
            src={project.thumbnail_url}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div
            className="project-card__gradient-placeholder"
            style={{ background: gradient }}
          >
            {catKey === 'design' && '🎨'}
            {catKey === 'video' && '🎬'}
            {catKey === 'motion' && '✨'}
            {catKey === 'branding' && '💎'}
          </div>
        )}

        <div className="project-card__overlay">
          <span className={`project-card__category project-card__category--${catKey}`}>
            {project.category || 'Design'}
          </span>

          {project.video_url && (
            <div className="project-card__play-icon">
              <FaPlay />
            </div>
          )}

          <div className="project-card__info">
            <h3 className="project-card__title">{project.title}</h3>
            {project.description && (
              <p className="project-card__description">{project.description}</p>
            )}
            <div className="project-card__actions">
              <button
                className="project-card__download-btn"
                onClick={handleDownload}
                title="Download project"
              >
                <FaDownload /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
