const visitors = [
  { name: "小明", age: 20, hasParent: false, hasTicket: true },
  { name: "小華", age: 15, hasParent: true, hasTicket: true },
  { name: "小美", age: 30, hasParent: false, hasTicket: false },
  { name: "阿強", age: 12, hasParent: false, hasTicket: true },
];
for (const visitor of visitors) {
  const isAllowedAge = visitor.age >= 18 || visitor.hasParent;
  const canEnter = isAllowedAge && visitor.hasTicket;
  if (canEnter) {
    console.log(`${visitor.name}：可以進入`);
  } else {
    console.log(`${visitor.name}：不能進入`);
  }
}
