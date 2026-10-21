/// 回傳 (內容的長度, 原本的 data)；data 是 None 時長度為 0
pub fn len_and_keep(data: Option<String>) -> (usize, Option<String>) {
    let len = match &data {
        Some(s) => s.len(),
        None => 0,
    };
    (len, data)
}
