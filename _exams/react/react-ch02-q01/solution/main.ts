function ticketPrice(age, basePrice = 300) {
  if (age < 6) {
    return 0;
  }
  if (age >= 65) {
    return basePrice / 2;
  }
  return basePrice;
}

console.log(ticketPrice(4));
console.log(ticketPrice(30));
console.log(ticketPrice(70));
console.log(ticketPrice(30, 500));
console.log(ticketPrice(70) + ticketPrice(30));
