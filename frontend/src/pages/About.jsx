import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Timeline from '../components/Timeline';
import StatsCounter from '../components/StatsCounter';
import { getAbout, getSkills, getTimeline } from '../services/api';

const fallbackAbout = {
  name: 'Alex Rivera',
  bio: "I'm a multidisciplinary designer and video editor with 5+ years of experience crafting visual stories that captivate audiences. From brand identities to cinematic reels, I bring ideas to life with precision and passion.\n\nMy work spans across branding, motion design, video editing, and creative direction. I believe great design is invisible — it guides, inspires, and moves people without them realizing why.",
  photo_url: null,
  availability: 'Available for Work',
};

const fallbackSkills = [
  { name: 'After Effects', proficiency: 95 },
  { name: 'Premiere Pro', proficiency: 92 },
  { name: 'Photoshop', proficiency: 90 },
  { name: 'Illustrator', proficiency: 85 },
  { name: 'Figma', proficiency: 88 },
  { name: 'DaVinci Resolve', proficiency: 80 },
  { name: 'Cinema 4D', proficiency: 75 },
  { name: 'Blender', proficiency: 70 },
  { name: 'Motion Graphics', proficiency: 93 },
  { name: 'Color Grading', proficiency: 88 },
  { name: 'Typography', proficiency: 85 },
  { name: 'Sound Design', proficiency: 72 },
];

const fallbackTimeline = [
  { id: 1, title: 'Senior Designer', organization: 'Studio Nova', type: 'work', start_date: '2022', end_date: 'Present', description: 'Leading design and video production for premium clients worldwide.' },
  { id: 2, title: 'Freelance Video Editor', organization: 'Self-employed', type: 'work', start_date: '2020', end_date: '2022', description: 'Built a portfolio of 50+ projects spanning music videos, commercials, and social campaigns.' },
  { id: 3, title: 'Junior Designer', organization: 'Creative Pulse Agency', type: 'work', start_date: '2019', end_date: '2020', description: 'Created brand assets and motion graphics for startups and mid-size companies.' },
  { id: 4, title: 'BFA in Visual Communication', organization: 'School of Visual Arts', type: 'education', start_date: '2015', end_date: '2019', description: 'Graduated with honors. Focused on motion design and brand strategy.' },
];

export default function About() {
  const [about, setAbout] = useState(fallbackAbout);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, skillData, timelineData] = await Promise.all([
          getAbout(),
          getSkills(),
          getTimeline(),
        ]);
        if (aboutData && Object.keys(aboutData).length) setAbout(aboutData);
        setSkills(skillData.length ? skillData : fallbackSkills);
        setTimeline(timelineData.length ? timelineData : fallbackTimeline);
      } catch {
        setSkills(fallbackSkills);
        setTimeline(fallbackTimeline);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="page-header container">
        <h1 className="page-header__title chrome-text">ABOUT ME</h1>
      </div>

      <section className="container" style={{ paddingBottom: '80px' }}>
        {/* Hero split */}
        <div className="about-hero">
          <motion.div
            className="about-hero__photo"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {about.photo_url ? (
              <img src={about.photo_url} alt={about.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            ) : (
              '👨‍🎨'
            )}
          </motion.div>

          <motion.div
            className="about-hero__bio"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <h2 className="gradient-text">Hello, I'm {about.name || 'Alex Rivera'}</h2>
            {(about.bio || '').split('\n').filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        <motion.h2
          className="section-heading chrome-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          SKILLS & EXPERTISE
        </motion.h2>

        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name || i}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="skill-card__name">{skill.name}</div>
                <div className="skill-card__bar">
                  <motion.div
                    className="skill-card__bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency || 80}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Timeline */}
        <motion.h2
          className="section-heading chrome-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '80px' }}
        >
          EXPERIENCE
        </motion.h2>

        <Timeline entries={timeline} />

        {/* Stats */}
        <div style={{ marginTop: '80px' }}>
          <StatsCounter />
        </div>
      </section>
    </div>
  );
}
