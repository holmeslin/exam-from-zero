// 接收一個使用者物件，回傳「名字，年齡 歲」；沒有 age 時當作 18。
export function introduce(user) {
  // TODO
  return `${user.name}，${user.age} 歲`;
}

// 回傳 [最小值, 最大值]
export function minMax(numbers) {
  // TODO
  return [numbers[0], numbers[numbers.length - 1]];
}

// 回傳 [b, a]：把兩個值的順序對調
export function swap(a, b) {
  // TODO
  return [a, b];
}
