const deposits = [100, 250, 80, 400, 30];
for (const deposit of deposits) {
  let total = 0;
  let bigCount = 0;
  total += deposit;
  if (deposit >= 200) {
    bigCount += 1;
  }
  console.log(`總金額：${total}`);
  console.log(`大額筆數：${bigCount}`);
}
