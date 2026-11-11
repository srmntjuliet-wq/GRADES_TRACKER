import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");

  const average =
    students.length > 0
      ? students.reduce((total, student) => total + student.grade, 0) /
        students.length
      : 0;

  const passed = students.filter((student) => student.grade >= 75).length;

  function addStudent(e) {
    e.preventDefault();

    if (!name.trim() || !subject.trim() || grade === "") {
      alert("Please complete all fields.");
      return;
    }

    const numericGrade = Number(grade);

    if (!Number.isFinite(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      alert("Grade must be between 0 and 100.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      subject,
      grade: numericGrade,
    };

    setStudents([...students, newStudent]);

    setName("");
    setSubject("");
    setGrade("");
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  return (
    <div className="container">
      <header>
        <h1>Student Grades Tracker</h1>
        <p>Manage student academic performance.</p>
      </header>

      <div className="dashboard">
        <div className="card">
          <h3>Total Students</h3>
          <h2>{students.length}</h2>
        </div>

        <div className="card">
          <h3>Average Grade</h3>
          <h2>{average.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h3>Passed Students</h3>
          <h2>{passed}</h2>
        </div>
      </div>

      <section className="form-section">
        <h2>Add Student Grade</h2>

        <form onSubmit={addStudent}>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="number"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <button type="submit">Add Grade</button>
        </form>
      </section>

      <section className="table-section">
        <h2>Student Records</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td>{student.grade}</td>
                <td>{student.grade >= 75 ? "Passed" : "Failed"}</td>
                <td>
                  <button onClick={() => deleteStudent(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;