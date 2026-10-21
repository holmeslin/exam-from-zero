const users = [
  { name: "小明", address: { city: "台北" } },
  { name: "小華" },
  { name: "小美", address: null },
  { name: "阿強", address: { city: "高雄" } },
];
for (const user of users) {
  console.log(`${user.name}：${user.address.city}`);
}
