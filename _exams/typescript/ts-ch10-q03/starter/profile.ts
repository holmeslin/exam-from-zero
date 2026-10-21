export async function loadProfile(
  getName: () => Promise<string>,
  getAge: () => Promise<number>,
): Promise<string> {
  const name = await getName()
  const age = await getAge()
  return `${name} 今年 ${age} 歲`
}
