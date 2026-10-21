use rust_ch09_q05::HitCounter;
use std::sync::Arc;
use std::thread;

#[test]
fn single_thread() {
    let c = HitCounter::new();
    assert_eq!(c.get(), 0, "新的計數器應該從 0 開始");
    assert_eq!(c.hit(), 1, "第一次 hit 應該回傳 1");
    assert_eq!(c.hit(), 2, "第二次 hit 應該回傳 2");
    assert_eq!(c.get(), 2, "get 應該回傳目前的總次數");
}

#[test]
fn many_threads() {
    let c = Arc::new(HitCounter::new());
    let mut handles = vec![];
    for _ in 0..8 {
        let c = Arc::clone(&c);
        handles.push(thread::spawn(move || (0..1000).map(|_| c.hit()).collect::<Vec<usize>>()));
    }
    let mut all = vec![];
    for h in handles {
        all.extend(h.join().expect("執行緒 panic 了"));
    }
    assert_eq!(c.get(), 8000, "8 條執行緒各 hit 1000 次，總數應該是 8000");
    all.sort();
    assert!(all == (1..=8000).collect::<Vec<usize>>(), "每次 hit 的回傳值應該剛好是 1 到 8000 各一次（加和讀要是同一個不可分割的動作）");
}
