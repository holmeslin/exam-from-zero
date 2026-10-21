#[repr(u8)]
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Level {
    Low,
    Medium,
    High,
    Critical,
    Emergency,
}

pub fn code(level: Level) -> u8 {
    todo!()
}

pub fn from_code(c: u8) -> Option<Level> {
    todo!()
}

pub fn from_big(c: u32) -> Option<Level> {
    todo!()
}
