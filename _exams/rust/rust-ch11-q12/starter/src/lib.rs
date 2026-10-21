use std::error::Error;
use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
pub enum PortError {
    Empty,
    NotNumber(ParseIntError),
    Reserved(u16),
}

impl fmt::Display for PortError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        todo!()
    }
}

// TODO：讓 source() 回傳底層原因
impl Error for PortError {}

impl From<ParseIntError> for PortError {
    fn from(e: ParseIntError) -> Self {
        todo!()
    }
}

pub fn parse_port(s: &str) -> Result<u16, PortError> {
    todo!()
}
