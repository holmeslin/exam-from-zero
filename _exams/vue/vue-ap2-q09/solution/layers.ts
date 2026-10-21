// 每個物件的 key 是檔案路徑（例如 "app/components/SiteFooter.vue"），value 是檔案內容
export function resolveFiles(
  project: Record<string, string>,
  layer: Record<string, string>,
): Record<string, string> {
  return { ...layer, ...project }
}
