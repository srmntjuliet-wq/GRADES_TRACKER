function App() {
  return (
    <div className="container">
      <header>
        <h1>Student Grades Tracker</h1>
        <p>Manage student academic performance.</p>
      </header>

      <div className="dashboard">
        <div className="card">
          <h3>Total Students</h3>
          <h2>0</h2>
        </div>

        <div className="card">
          <h3>Average Grade</h3>
          <h2>0.00</h2>
        </div>

        <div className="card">
          <h3>Passed Students</h3>
          <h2>0</h2>
        </div>
      </div>

      <section className="form-section">
        <h2>Add Student Grade</h2>

        <form>
          <input type="text" placeholder="Student Name" />
          <input type="text" placeholder="Subject" />
          <input type="number" placeholder="Grade" />

          <button type="button">Add Grade</button>
        </form>
      </section>
    </div>
  );
}

export default App;