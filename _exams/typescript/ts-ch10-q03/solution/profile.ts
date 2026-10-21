export async function loadProfile(
  getName: () => Promise<string>,
  getAge: () => Promise<number>,
): Promise<string> {
  const [name, age] = await Promise.all([getName(), getAge()])
  return `${name} 今年 ${age} 歲`
}
