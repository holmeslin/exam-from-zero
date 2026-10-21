pub trait Shape {
    fn area(&self) -> f64;

    fn describe(&self) -> String {
        format!("面積 {:.1}", self.area())
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
        self.w * self.h
    }
}

impl Shape for Square {
    fn area(&self) -> f64 {
        self.side * self.side
    }

    fn describe(&self) -> String {
        format!("正方形，邊長 {:.1}", self.side)
    }
}
