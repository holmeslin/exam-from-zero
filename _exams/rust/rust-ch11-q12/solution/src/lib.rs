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
        match self {
            PortError::Empty => write!(f, "埠號不能是空的"),
            PortError::NotNumber(_) => write!(f, "埠號不是有效的數字"),
            PortError::Reserved(n) => write!(f, "埠號 {} 是保留埠", n),
        }
    }
}

impl Error for PortError {
    fn source(&self) -> Option<&(dyn Error + 'static)> {
        match self {
            PortError::NotNumber(e) => Some(e),
            _ => None,
        }
    }
}

impl From<ParseIntError> for PortError {
    fn from(e: ParseIntError) -> Self {
        PortError::NotNumber(e)
    }
}

pub fn parse_port(s: &str) -> Result<u16, PortError> {
    let s = s.trim();
    if s.is_empty() {
        return Err(PortError::Empty);
    }
    let port: u16 = s.parse()?;
    if port < 1024 {
        return Err(PortError::Reserved(port));
    }
    Ok(port)
}
