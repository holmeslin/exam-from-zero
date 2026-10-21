use std::ops::Add;

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Vec2 {
    pub x: i32,
    pub y: i32,
}

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 {
        todo!()
    }
}

// TODO：再實作 Sub（a - b）、Neg（-a）、Mul<i32>（a * 3）和 AddAssign（a += b）
