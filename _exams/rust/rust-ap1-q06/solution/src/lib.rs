/// 依照題目規定的格式，回傳一列成績單文字
pub fn format_row(id: u32, name: &str, score: f64) -> String {
    format!("{id:0>5}|[{name:<6}]|{score:>7.2}|{{0x{id:0>2x}}}")
}
