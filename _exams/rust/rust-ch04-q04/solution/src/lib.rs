#[derive(Debug, Copy, Clone)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}

pub fn shift(p: Point, dx: i32, dy: i32) -> Point {
    Point { x: p.x + dx, y: p.y + dy }
}
