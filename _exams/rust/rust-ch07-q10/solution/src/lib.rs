use std::fmt;

/// 用 newtype 包住 Vec<i32>，才能替它實作 Display
pub struct Scores(pub Vec<i32>);

impl fmt::Display for Scores {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let items: Vec<String> = self.0.iter().map(|x| x.to_string()).collect();
        let total: i32 = self.0.iter().sum();
        write!(f, "[{}]，總分 {}", items.join(", "), total)
    }
}

pub trait Describe {
    fn describe(&self) -> String;
}

impl Describe for Vec<i32> {
    fn describe(&self) -> String {
        format!("有 {} 個元素", self.len())
    }
}
