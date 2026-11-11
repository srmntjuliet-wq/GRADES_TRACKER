function EmptyState({
  message = "No students yet",
  hint = "Add your first student using the form above.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">📚</div>
      <h3>{message}</h3>
      <p>{hint}</p>
    </div>
  );
}

export default EmptyState;