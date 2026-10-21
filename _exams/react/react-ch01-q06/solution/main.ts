const orders = [
  { name: "阿哲", isVip: true, total: 500, couponExpired: false },
  { name: "小芳", isVip: false, total: 1200, couponExpired: false },
  { name: "大雄", isVip: true, total: 800, couponExpired: true },
  { name: "靜香", isVip: false, total: 300, couponExpired: false },
];
for (const order of orders) {
  const qualifies = order.isVip || order.total >= 1000;
  const discount = qualifies && !order.couponExpired;
  if (discount) {
    console.log(`${order.name}：打九折`);
  } else {
    console.log(`${order.name}：原價`);
  }
}
