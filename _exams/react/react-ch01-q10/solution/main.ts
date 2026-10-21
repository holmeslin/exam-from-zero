const product = {
  name: "鍵盤",
  price: 1200,
  tags: ["電腦", "周邊"],
  maker: {
    name: "好打公司",
    country: "台灣",
  },
};
product.price = 990;
product.inStock = true;
product.tags.push("特價");
console.log(`${product.name}：${product.price} 元`);
console.log(`有庫存：${product.inStock}`);
console.log(`產地：${product.maker.country}`);
console.log(`最後一個標籤：${product.tags[product.tags.length - 1]}`);
