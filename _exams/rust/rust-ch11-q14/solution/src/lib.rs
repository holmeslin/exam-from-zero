use std::num::ParseIntError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AgeError {
    #[error("年齡不能是空的")]
    Empty,
    #[error("年齡不是數字")]
    NotNumber(#[from] ParseIntError),
    #[error("年齡 {0} 太大了")]
    TooOld(u32),
}

pub fn parse_age(s: &str) -> Result<u32, AgeError> {
    let s = s.trim();
    if s.is_empty() {
        return Err(AgeError::Empty);
    }
    let age: u32 = s.parse()?;
    if age > 150 {
        return Err(AgeError::TooOld(age));
    }
    Ok(age)
}
