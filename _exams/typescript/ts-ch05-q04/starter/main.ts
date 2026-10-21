function showCount(count: number | null | undefined) {
  if (count) {
    console.log(`共 ${count} 件`);
  } else {
    console.log("沒有資料");
  }
}

showCount(3);
showCount(0);
showCount(null);
showCount(undefined);
