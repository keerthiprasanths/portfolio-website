import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaBehance, FaDribbble, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialIcons = [
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaYoutube />, href: '#', label: 'YouTube' },
  { icon: <FaBehance />, href: '#', label: 'Behance' },
  { icon: <FaDribbble />, href: '#', label: 'Dribbble' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
  { icon: <FaXTwitter />, href: '#', label: 'X / Twitter' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__divider" />

      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <h3>ALEX RIVERA</h3>
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
        <span>&copy; {new Date().getFullYear()} Alex Rivera. All rights reserved.</span>
        <span>Made with ❤️ and lots of coffee</span>
      </div>
    </footer>
  );
}
