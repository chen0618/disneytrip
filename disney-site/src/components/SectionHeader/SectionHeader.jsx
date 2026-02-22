export default function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`section-header reveal ${className}`}>
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
}
