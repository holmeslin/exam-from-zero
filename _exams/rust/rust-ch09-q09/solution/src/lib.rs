use std::sync::{Mutex, MutexGuard};

/// 取鎖；如果鎖中毒了，把資料重設成空的 Vec、解除中毒，再回傳 guard
pub fn lock_or_reset(m: &Mutex<Vec<i32>>) -> MutexGuard<'_, Vec<i32>> {
    match m.lock() {
        Ok(g) => g,
        Err(poisoned) => {
            let mut g = poisoned.into_inner();
            *g = vec![];
            m.clear_poison();
            g
        }
    }
}
