const users = [
  { name: "小明", nickname: "阿明", address: { city: "台北" } },
  { name: "小華", nickname: null, address: { city: "高雄" } },
  { name: "小美", nickname: "美美" },
];

for (const user of users) {
  // TODO：nickname 是 null 時要改印「（無暱稱）」，沒有 address 時要改印「沒有地址」
  console.log(`${user.name}（${user.nickname}）：${user.address.city}`);
}
