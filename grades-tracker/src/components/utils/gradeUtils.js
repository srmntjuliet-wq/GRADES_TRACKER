export function getLetterGrade(grade) {
  if (grade >= 90) return "A";
  if (grade >= 80) return "B";
  if (grade >= 75) return "C";
  if (grade >= 60) return "D";
  return "F";
}

export function getGradeClass(grade) {
  if (grade >= 90) return "grade-a";
  if (grade >= 80) return "grade-b";
  if (grade >= 75) return "grade-c";
  if (grade >= 60) return "grade-d";
  return "grade-f";
}

export function getStatusLabel(grade) {
  return grade >= 75 ? "Passed" : "Failed";
}

export function getStatusClass(grade) {
  return grade >= 75 ? "passed" : "failed";
}