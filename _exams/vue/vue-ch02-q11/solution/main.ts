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

async function showStudent(id) {
  try {
    const student = await fetchStudent(id);
    console.log(`${student.name} 的數學成績：${student.scores.math}`);
  } catch (error) {
    console.log(`錯誤：${error.message}`);
  }
}

async function main() {
  await showStudent(2);
  await showStudent(99);
  await showStudent(1);
  console.log("查詢結束");
}

main();
