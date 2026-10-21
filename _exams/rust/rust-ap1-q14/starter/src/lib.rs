use std::fmt::Display;

/// 回傳用中括號包起來的文字，例如 bracket(&42) 回傳 "[42]"
pub fn bracket<T: Display>(val: &T) -> String {
    format!("[{val}]")
}
