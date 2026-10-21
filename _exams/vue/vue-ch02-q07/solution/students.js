export function updateEnglish(students, id, score) {
  return students.map((student) =>
    student.id === id
      ? { ...student, scores: { ...student.scores, english: score } }
      : student,
  );
}
