// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Light {
    Red,
    Yellow,
    Green,
}

impl Light {
    pub fn next(self) -> Self {
        match self {
            Self::Red => Self::Green,
            Self::Green => Self::Yellow,
            Self::Yellow => Self::Red,
        }
    }

    pub fn seconds(self) -> i32 {
        match self {
            Self::Red => 30,
            Self::Yellow => 3,
            Self::Green => 25,
        }
    }
}
