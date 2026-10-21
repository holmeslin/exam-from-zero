import { formatPrice, type Product } from "./product.ts";

const pen: Product = { name: "原子筆", price: 15 };
console.log(formatPrice(pen));
