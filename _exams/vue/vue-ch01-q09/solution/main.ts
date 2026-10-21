const users = [
  { name: "小明", nickname: "阿明", address: { city: "台北" } },
  { name: "小華", nickname: null, address: { city: "高雄" } },
  { name: "小美", nickname: "美美" },
];

for (const user of users) {
  const nickname = user.nickname === null ? "（無暱稱）" : `（${user.nickname}）`;
  let city = "沒有地址";
  if (user.address !== undefined) {
    city = user.address.city;
  }
  console.log(`${user.name}${nickname}：${city}`);
}
