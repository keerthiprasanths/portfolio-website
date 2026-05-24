import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ContactForm from '../components/ContactForm';
import SocialCard from '../components/SocialCard';
import { getSocialLinks, getAbout } from '../services/api';

const fallbackSocials = [
  { platform: 'Instagram', url: 'https://instagram.com', username: 'alexrivera' },
  { platform: 'YouTube', url: 'https://youtube.com', username: 'AlexRivera' },
  { platform: 'Behance', url: 'https://behance.net', username: 'alexrivera' },
  { platform: 'Dribbble', url: 'https://dribbble.com', username: 'alexrivera' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', username: 'alexrivera' },
  { platform: 'Twitter', url: 'https://x.com', username: 'alexrivera' },
];

export default function Contact() {
  const [socials, setSocials] = useState([]);
  const [availability, setAvailability] = useState('Available for Work');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socialData, aboutData] = await Promise.all([
          getSocialLinks(),
          getAbout(),
        ]);
        setSocials(socialData.length ? socialData : fallbackSocials);
        if (aboutData && aboutData.availability) setAvailability(aboutData.availability);
      } catch {
        setSocials(fallbackSocials);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative orbs */}
      <div className="decorative-orb decorative-orb--purple" style={{ width: 400, height: 400, top: '10%', right: '-5%', position: 'absolute' }} />
      <div className="decorative-orb decorative-orb--pink" style={{ width: 350, height: 350, bottom: '5%', left: '-8%', position: 'absolute' }} />
      <div className="decorative-orb decorative-orb--cyan" style={{ width: 300, height: 300, top: '50%', left: '40%', position: 'absolute' }} />

      <div className="page-header container">
        <h1 className="page-header__title chrome-text">LET'S CONNECT</h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <div className="availability-badge">
            <span className="availability-badge__dot" />
            {availability}
          </div>
        </motion.div>
      </div>

      <section className="container" style={{ paddingBottom: '100px', position: 'relative', zIndex: 1 }}>
        <div className="contact-layout">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px', color: 'var(--chrome-shine)' }}>
              Send a Message
            </h2>
            <ContactForm />
          </motion.div>

          {/* Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px', color: 'var(--chrome-shine)' }}>
              Find Me Online
            </h2>
            <div className="contact-layout__socials-grid">
              {socials.map((social) => (
                <SocialCard
                  key={social.platform}
                  platform={social.platform}
                  url={social.url}
                  username={social.username}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
