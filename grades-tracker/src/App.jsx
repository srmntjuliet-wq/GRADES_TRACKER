import { useState, useEffect } from "react";
import StatCard from "./components/StatCard";
import EmptyState from "./components/EmptyState";
import {
  getLetterGrade,
  getGradeClass,
  getStatusLabel,
} from "./utils/gradeUtils";

function App() {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem("students")) || [];
  });
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [subjectFilter, setSubjectFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const average =
    students.length > 0
      ? students.reduce((total, student) => total + student.grade, 0) /
        students.length
      : 0;

  const passed = students.filter((student) => student.grade >= 75).length;

  const subjectOptions = [
    "all",
    ...Array.from(new Set(students.map((s) => s.subject))),
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || student.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const visibleStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      const cmp = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? cmp : -cmp;
    }
    return sortOrder === "asc" ? a.grade - b.grade : b.grade - a.grade;
  });

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

    if (editId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? { ...student, name, subject, grade: numericGrade }
            : student
        )
      );
      setEditId(null);
    } else {
      setStudents([
        ...students,
        { id: Date.now(), name, subject, grade: numericGrade },
      ]);
    }

    setName("");
    setSubject("");
    setGrade("");
  }

  function editStudent(student) {
    setName(student.name);
    setSubject(student.subject);
    setGrade(String(student.grade));
    setEditId(student.id);
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  function exportCSV() {
    if (visibleStudents.length === 0) return;

    const header = ["Name", "Subject", "Grade", "Level", "Status"];
    const rows = visibleStudents.map((s) => [
      s.name,
      s.subject,
      s.grade,
      getLetterGrade(s.grade),
      getStatusLabel(s.grade),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container">
      <header>
        <h1>Student Grades Tracker</h1>
        <p>Manage student academic performance.</p>
      </header>

      <div className="dashboard">
        <StatCard label="Total Students" value={students.length} icon="👥" accent="pink" />
        <StatCard label="Average Grade" value={average.toFixed(2)} icon="📊" accent="rose" />
        <StatCard label="Passed Students" value={passed} icon="✅" accent="violet" />
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

          <button type="submit">
            {editId !== null ? "Update Grade" : "Add Grade"}
          </button>
        </form>
      </section>

      <section className="table-section">
        <div className="table-header">
          <h2>Student Records</h2>

          <button
            type="button"
            className="export-button"
            onClick={exportCSV}
            disabled={visibleStudents.length === 0}
          >
            ⬇ Export CSV
          </button>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All Subjects" : option}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-controls">
          <span>Sort by:</span>
          <button
            type="button"
            className={sortBy === "name" ? "active" : ""}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
          <button
            type="button"
            className={sortBy === "grade" ? "active" : ""}
            onClick={() => setSortBy("grade")}
          >
            Grade
          </button>
          <button
            type="button"
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
          >
            {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>
        </div>

        {visibleStudents.length === 0 ? (
          <EmptyState
            message={
              students.length === 0
                ? "No students yet"
                : "No matching students"
            }
            hint={
              students.length === 0
                ? "Add your first student using the form above."
                : "Try adjusting your search or filter."
            }
          />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.subject}</td>
                  <td>{student.grade}</td>
                  <td>
                    <span className={`grade-badge ${getGradeClass(student.grade)}`}>
                      {getLetterGrade(student.grade)}
                    </span>
                  </td>
                  <td className={student.grade >= 75 ? "passed" : "failed"}>
                    {getStatusLabel(student.grade)}
                  </td>
                  <td>
                    <button onClick={() => editStudent(student)}>Edit</button>
                    <button onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer>
        <p>Student Grades Tracker</p>
        <p>Built with React and Vite · 30 commits</p>
      </footer>
    </div>
  );
}

export default App;