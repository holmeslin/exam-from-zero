pub trait Shape {
    fn area(&self) -> f64;

    // 預設實作：回傳「面積 X」，X 取到小數點後一位
    fn describe(&self) -> String {
        todo!()
    }
}

pub struct Rect {
    pub w: f64,
    pub h: f64,
}

pub struct Square {
    pub side: f64,
}

impl Shape for Rect {
    fn area(&self) -> f64 {
        todo!()
    }
}

impl Shape for Square {
    fn area(&self) -> f64 {
        todo!()
    }
    // Square 要覆寫 describe
}
