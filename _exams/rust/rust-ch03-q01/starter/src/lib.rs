// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub struct Rectangle {
    pub width: i32,
    pub height: i32,
}

pub fn area(r: Rectangle) -> i32 {
    todo!("回傳 r 的面積")
}

pub fn is_square(r: Rectangle) -> bool {
    todo!("寬和高相等時回傳 true")
}
