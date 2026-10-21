pub struct Celsius {
    pub value: f64,
}

pub struct Fahrenheit {
    pub value: f64,
}

impl From<Celsius> for Fahrenheit {
    fn from(c: Celsius) -> Fahrenheit {
        Fahrenheit {
            value: c.value * 1.8 + 32.0,
        }
    }
}

pub struct Percent {
    pub value: u8,
}

impl TryFrom<i32> for Percent {
    type Error = String;

    fn try_from(n: i32) -> Result<Percent, String> {
        if n >= 0 && n <= 100 {
            Ok(Percent { value: n as u8 })
        } else {
            Err(format!("超出範圍：{}", n))
        }
    }
}
