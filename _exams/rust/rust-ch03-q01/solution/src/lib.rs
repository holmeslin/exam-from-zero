// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub struct Rectangle {
    pub width: i32,
    pub height: i32,
}

pub fn area(r: Rectangle) -> i32 {
    r.width * r.height
}

pub fn is_square(r: Rectangle) -> bool {
    r.width == r.height
}
