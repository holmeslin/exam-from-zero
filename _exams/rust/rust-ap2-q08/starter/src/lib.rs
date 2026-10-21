pub struct User;
pub struct Article;

// 目前無法編譯：T 沒有出現在任何欄位裡。
pub struct Id<T> {
    value: u64,
}

impl<T> Id<T> {
    pub fn new(value: u64) -> Self {
        Id { value }
    }

    pub fn value(&self) -> u64 {
        self.value
    }
}
