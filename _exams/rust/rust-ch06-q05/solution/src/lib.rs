// 回傳一個閉包：傳入數字 n，產生「prefix-n」格式的標籤
pub fn make_labeler(prefix: String) -> impl Fn(i32) -> String {
    move |n| format!("{}-{}", prefix, n)
}
