pub struct Rect {
    pub width: i32,
    pub height: i32,
}

// 只是借來讀，不拿走所有權
pub fn perimeter(r: &Rect) -> i32 {
    (r.width + r.height) * 2
}
