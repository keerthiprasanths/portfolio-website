export default function SkillsMarquee({ skills = [] }) {
  if (!skills.length) return null;

  // Duplicate the list for seamless infinite scroll
  const doubledSkills = [...skills, ...skills];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {doubledSkills.map((skill, i) => (
          <div key={`${skill.name}-${i}`} className="marquee-skill">
            {skill.icon && <span className="marquee-skill__icon">{skill.icon}</span>}
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
