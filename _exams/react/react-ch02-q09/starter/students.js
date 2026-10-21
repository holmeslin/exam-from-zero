// 回傳新的學生陣列：把 id 相符那位學生的 scores.english 改成 score。
// 不能改動原本的 students（包含裡面的 scores 物件）；其他學生原樣沿用。
export function updateEnglish(students, id, score) {
  return students.map((student) => {
    if (student.id !== id) {
      return student;
    }
    const copy = { ...student };
    copy.scores.english = score;
    return copy;
  });
}
