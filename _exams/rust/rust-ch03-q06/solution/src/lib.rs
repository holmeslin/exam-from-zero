// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Shape {
    Rectangle(i32, i32),
    Square(i32),
    Triangle(i32, i32),
}

pub fn area(s: Shape) -> i32 {
    match s {
        Shape::Rectangle(w, h) => w * h,
        Shape::Square(side) => side * side,
        Shape::Triangle(base, height) => base * height / 2,
    }
}
