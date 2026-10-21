import { formatPrice } from "./product.ts";
import type { Product } from "./product.ts";

const pen: Product = { name: "原子筆", price: 15 };
const book: Product = { name: "筆記本", price: 45 };
console.log(formatPrice(pen));
console.log(formatPrice(book));
