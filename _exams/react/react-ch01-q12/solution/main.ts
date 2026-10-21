const users = [
  { name: "小明", address: { city: "台北" } },
  { name: "小華" },
  { name: "小美", address: null },
  { name: "阿強", address: { city: "高雄" } },
];
for (const user of users) {
  if (user.address === undefined) {
    console.log(`${user.name}：沒有地址欄位`);
  } else if (user.address === null) {
    console.log(`${user.name}：地址未填`);
  } else {
    console.log(`${user.name}：${user.address.city}`);
  }
}
