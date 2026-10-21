use std::num::ParseIntError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AgeError {
    #[error("TODO")]
    Empty,
    #[error("TODO")]
    NotNumber(ParseIntError),
    #[error("TODO")]
    TooOld(u32),
}

pub fn parse_age(s: &str) -> Result<u32, AgeError> {
    todo!()
}
