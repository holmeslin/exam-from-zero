use std::sync::atomic::{AtomicUsize, Ordering};

pub struct HitCounter {
    hits: AtomicUsize,
}

impl HitCounter {
    pub fn new() -> Self {
        HitCounter { hits: AtomicUsize::new(0) }
    }

    /// 記一次點擊，回傳加完之後的總次數
    pub fn hit(&self) -> usize {
        self.hits.fetch_add(1, Ordering::SeqCst) + 1
    }

    pub fn get(&self) -> usize {
        self.hits.load(Ordering::SeqCst)
    }
}
