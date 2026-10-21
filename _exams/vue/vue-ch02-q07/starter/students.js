// 回傳一份新的學生陣列：id 符合的那位學生，英文成績（scores.english）改成 score。
// 原本的 students（以及裡面的物件）都不能被改到；沒被改的學生可以沿用原本的物件。
export function updateEnglish(students, id, score) {
  // TODO：這樣寫會改到原本的資料
  const student = students.find((item) => item.id === id);
  student.scores.english = score;
  return students;
}
