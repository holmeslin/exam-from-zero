use rust_ch09_q09::lock_or_reset;
use std::sync::{Arc, Mutex};
use std::thread;

#[test]
fn healthy_lock_keeps_data() {
    let m = Mutex::new(vec![1, 2, 3]);
    {
        let mut g = lock_or_reset(&m);
        assert_eq!(*g, vec![1, 2, 3], "鎖沒中毒時資料應該原封不動");
        g.push(4);
    }
    assert_eq!(*m.lock().expect("鎖不該中毒"), vec![1, 2, 3, 4], "透過 guard 的修改應該保留");
}

#[test]
fn poisoned_lock_is_reset_and_cleared() {
    let m = Arc::new(Mutex::new(vec![1, 2, 3]));
    let m2 = Arc::clone(&m);
    let h = thread::spawn(move || {
        let mut g = m2.lock().expect("鎖失敗");
        g.push(99);
        panic!("測試故意讓鎖中毒");
    });
    let _ = h.join();
    assert!(m.is_poisoned(), "測試前置：鎖應該已經中毒");

    {
        let mut g = lock_or_reset(&m);
        assert_eq!(*g, Vec::<i32>::new(), "鎖中毒時應該把資料重設成空的 Vec");
        g.push(7);
    }
    assert!(!m.is_poisoned(), "修好資料之後要解除中毒");
    assert_eq!(*m.lock().expect("之後一般的 lock 應該恢復正常"), vec![7], "解除中毒後資料應該是重設後再推進去的 [7]");
}
