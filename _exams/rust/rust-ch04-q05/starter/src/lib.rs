pub struct Rect {
    pub width: i32,
    pub height: i32,
}

// 這個函式會把 Rect move 進來，呼叫後原本的變數就不能用了
pub fn perimeter(r: Rect) -> i32 {
    (r.width + r.height) * 2
}
