import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Timeline from '../components/Timeline';
import StatsCounter from '../components/StatsCounter';
import { getAbout, getSkills, getTimeline } from '../services/api';

const fallbackAbout = {
  name: 'Keerthi Prasanth S',
  bio: "I'm a creative designer and video editor currently pursuing my MCA at SRM Institute of Science and Technology, Kattankulathur. With hands-on experience in video editing, graphic design, and digital marketing, I bring ideas to life through compelling visuals and engaging content.\n\nBeyond design, I'm passionate about technology — from building AI-powered applications to web development with Python, HTML, and CSS. I've been recognized with a World Records Union Certificate for organizing events with 6000+ students. Let's create something extraordinary together.",
  photo_url: null,
  availability: 'Available for Work',
};

const fallbackSkills = [
  { name: 'Adobe Photoshop', proficiency: 90 },
  { name: 'Video Editing', proficiency: 88 },
  { name: 'Python', proficiency: 85 },
  { name: 'HTML & CSS', proficiency: 88 },
  { name: 'Digital Marketing', proficiency: 82 },
  { name: 'UI/UX Design', proficiency: 78 },
  { name: 'Graphic Design', proficiency: 85 },
  { name: 'Social Media Management', proficiency: 80 },
];

const fallbackTimeline = [
  { id: 1, title: 'MCA', organization: 'SRM Institute of Science and Technology', type: 'education', start_date: '2024', end_date: '2026', description: 'Pursuing Master of Computer Applications with 7.8 CGPA.' },
  { id: 2, title: 'Video Editor & Designer — Intern', organization: 'SRM Tamilperayam', type: 'work', start_date: 'June 2024', end_date: 'August 2024', description: 'Managed social media, designed visual content, and edited videos.' },
  { id: 3, title: 'Overall Students Convenor', organization: 'Paarivendhar Students Tamil Association, SRMIST', type: 'work', start_date: '2022', end_date: '2026', description: 'Leading the association. Organized cultural fests recognized by All India Books of Record.' },
  { id: 4, title: 'B.Sc Computer Science', organization: 'SRM Arts and Science College', type: 'education', start_date: '2022', end_date: '2025', description: 'Graduated with 77%. Strong foundation in programming and web development.' },
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
            <h2 className="gradient-text">Hello, I'm {about.name || 'Keerthi Prasanth S'}</h2>
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
