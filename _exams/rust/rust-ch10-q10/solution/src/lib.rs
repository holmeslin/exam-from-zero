#[repr(u8)]
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Level {
    Low = 1,
    Medium,
    High,
    Critical = 10,
    Emergency,
}

pub fn code(level: Level) -> u8 {
    level as u8
}

pub fn from_code(c: u8) -> Option<Level> {
    match c {
        1 => Some(Level::Low),
        2 => Some(Level::Medium),
        3 => Some(Level::High),
        10 => Some(Level::Critical),
        11 => Some(Level::Emergency),
        _ => None,
    }
}

pub fn from_big(c: u32) -> Option<Level> {
    match u8::try_from(c) {
        Ok(small) => from_code(small),
        Err(_) => None,
    }
}
