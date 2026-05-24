import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import HeroSection from '../components/HeroSection';
import BentoGrid from '../components/BentoGrid';
import SkillsMarquee from '../components/SkillsMarquee';
import StatsCounter from '../components/StatsCounter';
import VideoPlayer from '../components/VideoPlayer';
import { getProjects, getSkills } from '../services/api';

/* ---- Fallback data so the site looks good without backend ---- */
const fallbackProjects = [
  { id: 1, title: 'Brand Identity — Luxe', category: 'Design', description: 'Complete brand identity for a luxury fashion label.', featured: true },
  { id: 2, title: 'Cinematic Reel 2024', category: 'Video', description: 'Showreel showcasing narrative and commercial work.', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', featured: true },
  { id: 3, title: 'Motion System — Apex', category: 'Motion', description: 'UI motion design system for fintech app.', featured: true },
  { id: 4, title: 'Packaging — Aura', category: 'Branding', description: 'Product packaging for premium skincare line.', featured: true },
  { id: 5, title: 'Social Campaign — Drift', category: 'Design', description: 'Visual campaign for streetwear brand launch.', featured: true },
];

const fallbackSkills = [
  { name: 'After Effects', icon: '🎞️' },
  { name: 'Premiere Pro', icon: '🎬' },
  { name: 'Photoshop', icon: '🖌️' },
  { name: 'Illustrator', icon: '✏️' },
  { name: 'Figma', icon: '🎨' },
  { name: 'DaVinci Resolve', icon: '🎥' },
  { name: 'Cinema 4D', icon: '🧊' },
  { name: 'Blender', icon: '🔮' },
  { name: 'Motion Graphics', icon: '✨' },
  { name: 'Color Grading', icon: '🌈' },
  { name: 'Typography', icon: '🔤' },
  { name: 'Sound Design', icon: '🎵' },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, skillData] = await Promise.all([
          getProjects(null, true),
          getSkills(),
        ]);
        setProjects(projData.length ? projData : fallbackProjects);
        setSkills(skillData.length ? skillData : fallbackSkills);
      } catch {
        setProjects(fallbackProjects);
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Featured Projects */}
      <section className="section-padding container">
        <motion.h2
          className="section-heading chrome-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          FEATURED WORK
        </motion.h2>

        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <BentoGrid projects={projects} />
        )}
      </section>

      <hr className="gradient-divider" />

      {/* Skills Marquee */}
      <section className="section-padding">
        <motion.h2
          className="section-heading chrome-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          TOOLS & SKILLS
        </motion.h2>
        <SkillsMarquee skills={skills} />
      </section>

      <hr className="gradient-divider" />

      {/* Stats */}
      <section className="section-padding container">
        <motion.h2
          className="section-heading chrome-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          BY THE NUMBERS
        </motion.h2>
        <StatsCounter />
      </section>
    </div>
  );
}
