function StatCard({ label, value, icon, accent = "pink" }) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <h3>{label}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatCard;