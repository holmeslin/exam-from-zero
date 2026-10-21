const students = [
  { id: 1, name: "小明", scores: { math: 90, english: 70 } },
  { id: 2, name: "小華", scores: { math: 55, english: 80 } },
];

// 模擬向伺服器查詢學生，稍等一下才回傳，找不到就失敗。已經寫好了，不用改
function fetchStudent(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = students.find((item) => item.id === id);
      if (student) {
        resolve(student);
      } else {
        reject(new Error("查無此人"));
      }
    }, 20);
  });
}

// TODO：成功時印「名字 的數學成績：分數」，失敗時印「錯誤：錯誤訊息」
function showStudent(id) {
  const student = fetchStudent(id);
  console.log(`${student.name} 的數學成績：${student.scores?.math}`);
}

// TODO：依序（等前一個完成再做下一個）查詢 2、99、1
showStudent(2);
showStudent(99);
showStudent(1);
console.log("查詢結束");
