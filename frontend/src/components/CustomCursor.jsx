import { useState, useEffect, useCallback } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);

  const onMouseMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    // Hide on mobile / touch
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      setVisible(false);
      return;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onOver = () => setHovering(true);
    const onOut = () => setHovering(false);

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .project-card, .social-card, .filter-bar__pill').forEach((el) => {
        el.addEventListener('mouseenter', onOver);
        el.addEventListener('mouseleave', onOut);
      });
    };

    // Initial + observe DOM changes
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, [onMouseMove]);

  if (!visible) return null;

  return (
    <div className="custom-cursor">
      <div
        className={`custom-cursor__outer ${hovering ? 'custom-cursor__outer--hover' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="custom-cursor__inner"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}
