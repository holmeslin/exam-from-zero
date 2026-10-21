pub trait Shape {
    fn area(&self) -> u32;
}

pub struct Square {
    pub side: u32,
}

pub struct Rect {
    pub w: u32,
    pub h: u32,
}

impl Shape for Square {
    fn area(&self) -> u32 {
        self.side * self.side
    }
}

impl Shape for Rect {
    fn area(&self) -> u32 {
        self.w * self.h
    }
}

pub fn make_shape(kind: &str, a: u32, b: u32) -> Box<dyn Shape> {
    todo!()
}

pub fn total_area(shapes: &[Box<dyn Shape>]) -> u32 {
    todo!()
}
