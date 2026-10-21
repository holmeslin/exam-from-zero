export function introduce({ name, age = 18, city = "未知" }) {
  return `${name}，${age} 歲，住在${city}`;
}
