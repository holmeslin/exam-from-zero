#[derive(Debug, PartialEq)]
pub struct Pair<T> {
    pub first: T,
    pub second: T,
}

// 目前只幫 Pair<i32> 實作了方法，Pair<&str>、Pair<String> 都沒有
impl Pair<i32> {
    pub fn new(first: i32, second: i32) -> Pair<i32> {
        Pair { first, second }
    }

    pub fn first(&self) -> &i32 {
        &self.first
    }

    pub fn swap(self) -> Pair<i32> {
        Pair {
            first: self.second,
            second: self.first,
        }
    }
}
