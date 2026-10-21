// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Shape {
    Rectangle(i32, i32),
    Square(i32),
    Triangle(i32, i32),
}

pub fn area(s: Shape) -> i32 {
    todo!("用 match 解構每個 variant 並算出面積")
}
