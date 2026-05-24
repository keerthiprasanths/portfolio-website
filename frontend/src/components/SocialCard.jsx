import { motion } from 'motion/react';
import { FaInstagram, FaYoutube, FaBehance, FaDribbble, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const iconMap = {
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  behance: <FaBehance />,
  dribbble: <FaDribbble />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  x: <FaXTwitter />,
};

export default function SocialCard({ platform, url, username, icon }) {
  const platformKey = (platform || '').toLowerCase();
  const IconComponent = icon || iconMap[platformKey] || null;

  return (
    <motion.a
      href={url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card social-card--${platformKey}`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="social-card__icon">
        {IconComponent}
      </div>
      {username && <span className="social-card__username">@{username}</span>}
    </motion.a>
  );
}
