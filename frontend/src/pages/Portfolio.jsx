import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiX, FiExternalLink } from 'react-icons/fi';
import { FaDownload } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import VideoPlayer from '../components/VideoPlayer';
import { getProjects } from '../services/api';

const categories = ['All', 'Design', 'Video', 'Motion', 'Branding'];

const fallbackProjects = [
  { id: 1, title: 'Brand Identity — Luxe', category: 'Design', description: 'Complete brand identity for a luxury fashion label including logo, color system, and typography.', tags: ['Branding', 'Identity', 'Print'] },
  { id: 2, title: 'Cinematic Reel 2024', category: 'Video', description: 'Showreel showcasing narrative and commercial video work from the past year.', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', tags: ['Video', 'Editing', 'Color'] },
  { id: 3, title: 'Motion System — Apex', category: 'Motion', description: 'UI motion design system for a fintech application with 40+ micro-interactions.', tags: ['Motion', 'UI/UX', 'Lottie'] },
  { id: 4, title: 'Packaging — Aura', category: 'Branding', description: 'Product packaging and unboxing experience design for premium skincare line.', tags: ['Packaging', 'Print', '3D'] },
  { id: 5, title: 'Social Campaign — Drift', category: 'Design', description: 'Visual campaign with 30+ assets for streetwear brand social media launch.', tags: ['Social', 'Campaign', 'Digital'] },
  { id: 6, title: 'Music Video — Echoes', category: 'Video', description: 'Directed and edited music video with custom VFX and color grading.', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', tags: ['Music Video', 'VFX', 'Direction'] },
  { id: 7, title: 'Logo Collection Vol.2', category: 'Design', description: 'Curated collection of minimalist logo designs for tech startups.', tags: ['Logo', 'Minimal', 'Vector'] },
  { id: 8, title: 'Title Sequence — Noir', category: 'Motion', description: 'Opening title sequence for independent film with noir aesthetic.', tags: ['Titles', 'Film', 'Cinema 4D'] },
  { id: 9, title: 'Brand Guide — Solara', category: 'Branding', description: 'Comprehensive 60-page brand guidelines for renewable energy startup.', tags: ['Guidelines', 'Brand', 'Layout'] },
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.length ? data : fallbackProjects);
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => (p.category || '').toLowerCase() === activeFilter.toLowerCase());

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <div>
      <div className="page-header container">
        <h1 className="page-header__title chrome-text">MY WORK</h1>
      </div>

      <section className="container" style={{ paddingBottom: '100px' }}>
        {/* Filter Bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-bar__pill ${activeFilter === cat ? 'filter-bar__pill--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <motion.div className="masonry-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="project-modal__backdrop"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="project-modal__content"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <button
                className="project-modal__close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <FiX />
              </button>

              {/* Media */}
              <div className="project-modal__media">
                {selectedProject.video_url ? (
                  <VideoPlayer
                    url={selectedProject.video_url}
                    thumbnail={selectedProject.thumbnail_url}
                  />
                ) : selectedProject.thumbnail_url ? (
                  <img
                    className="project-modal__image"
                    src={selectedProject.thumbnail_url}
                    alt={selectedProject.title}
                  />
                ) : (
                  <div
                    className="project-card__gradient-placeholder"
                    style={{
                      background: 'var(--gradient-purple)',
                      height: '300px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '4rem',
                    }}
                  >
                    🎨
                  </div>
                )}
              </div>

              <h2 className="project-modal__title">{selectedProject.title}</h2>
              <span className="project-modal__category">{selectedProject.category}</span>
              <p className="project-modal__description">{selectedProject.description}</p>

              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className="project-modal__tags">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="project-modal__tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="project-modal__links">
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal__link project-modal__link--primary"
                  >
                    <FiExternalLink /> Live Site
                  </a>
                )}
                <button
                  className="project-modal__link project-modal__link--secondary"
                  onClick={() => {
                    if (selectedProject.download_url) {
                      window.open(selectedProject.download_url, '_blank');
                    }
                  }}
                >
                  <FaDownload /> Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
