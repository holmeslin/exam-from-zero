use std::sync::atomic::{AtomicUsize, Ordering};

pub struct HitCounter {
    hits: AtomicUsize,
}

impl HitCounter {
    pub fn new() -> Self {
        todo!()
    }

    /// 記一次點擊，回傳加完之後的總次數
    pub fn hit(&self) -> usize {
        todo!()
    }

    pub fn get(&self) -> usize {
        todo!()
    }
}
