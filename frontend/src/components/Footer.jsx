import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaBehance, FaDribbble, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialIcons = [
  { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/keerthiprasanths', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://instagram.com/keerthiprasanths', label: 'Instagram' },
  { icon: <FaYoutube />, href: 'https://youtube.com/@keerthiprasanths', label: 'YouTube' },
  { icon: <FaBehance />, href: 'https://behance.net/keerthiprasanths', label: 'Behance' },
  { icon: <FaDribbble />, href: 'https://dribbble.com/keerthiprasanths', label: 'Dribbble' },
  { icon: <FaXTwitter />, href: 'https://x.com/keerthiprasanths', label: 'X / Twitter' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__divider" />

      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <h3>KEERTHI PRASANTH S</h3>
          <p>
            Designer &amp; Video Editor crafting visual stories that leave a lasting impression. Let's create something extraordinary together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer__column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer__column">
          <h4>Connect</h4>
          <div className="footer__socials">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-icon"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {new Date().getFullYear()} Keerthi Prasanth S. All rights reserved.</span>
        <span>Made with ❤️ and lots of coffee</span>
      </div>
    </footer>
  );
}
