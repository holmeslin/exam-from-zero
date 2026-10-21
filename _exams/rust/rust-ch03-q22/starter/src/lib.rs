// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Light {
    Red,
    Yellow,
    Green,
}

impl Light {
    pub fn next(self) -> Self {
        todo!("紅 → 綠 → 黃 → 紅")
    }

    pub fn seconds(self) -> i32 {
        todo!("紅燈 30 秒、黃燈 3 秒、綠燈 25 秒")
    }
}
