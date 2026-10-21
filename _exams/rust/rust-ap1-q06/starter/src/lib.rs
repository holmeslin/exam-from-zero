/// 依照題目規定的格式，回傳一列成績單文字
pub fn format_row(id: u32, name: &str, score: f64) -> String {
    format!("{id}|{name}|{score}")
}
