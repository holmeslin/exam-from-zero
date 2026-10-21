// 規則：成年人、或是有家長陪同的人可以進場，但前提是要有票
const visitors = [
  { name: "小明", age: 20, hasParent: false, hasTicket: true },
  { name: "小華", age: 15, hasParent: true, hasTicket: true },
  { name: "小美", age: 25, hasParent: false, hasTicket: false },
  { name: "小強", age: 12, hasParent: false, hasTicket: true },
];

for (const visitor of visitors) {
  if ((visitor.age >= 18 || visitor.hasParent) && visitor.hasTicket) {
    console.log(`${visitor.name}：可以進入`);
  } else {
    console.log(`${visitor.name}：不能進入`);
  }
}
