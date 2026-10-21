use std::fmt;

/// 用 newtype 包住 Vec<i32>，才能替它實作 Display
pub struct Scores(pub Vec<i32>);

impl fmt::Display for Scores {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        todo!()
    }
}

pub trait Describe {
    fn describe(&self) -> String;
}

// TODO：替 Vec<i32> 實作 Describe
