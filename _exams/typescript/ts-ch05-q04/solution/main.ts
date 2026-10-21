function showCount(count: number | null | undefined) {
  if (count == null) {
    console.log("沒有資料");
  } else {
    console.log(`共 ${count} 件`);
  }
}

showCount(3);
showCount(0);
showCount(null);
showCount(undefined);
