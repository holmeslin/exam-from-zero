// 把 title 改成可選參數，沒傳的時候不要印出 undefined
export function greet(name: string, title: string) {
  return `${name}${title}您好`;
}
