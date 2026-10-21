pub struct Celsius {
    pub value: f64,
}

pub struct Fahrenheit {
    pub value: f64,
}

// 華氏 = 攝氏 * 1.8 + 32
impl From<Celsius> for Fahrenheit {
    fn from(c: Celsius) -> Fahrenheit {
        todo!()
    }
}

pub struct Percent {
    pub value: u8,
}

// 0 到 100（含）才能轉換成功，否則回傳錯誤訊息「超出範圍：<數字>」
impl TryFrom<i32> for Percent {
    type Error = String;

    fn try_from(n: i32) -> Result<Percent, String> {
        todo!()
    }
}
