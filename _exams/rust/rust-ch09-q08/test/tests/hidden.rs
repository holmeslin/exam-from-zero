use rust_ch09_q08::Registry;
use std::sync::Arc;
use std::thread;

#[test]
fn basic_usage() {
    let r = Registry::new();
    assert_eq!(r.len(), 0, "新的 Registry 應該是空的");
    assert!(r.add("ann"), "第一次加入 ann 應該回傳 true");
    assert!(!r.add("ann"), "重複加入 ann 應該回傳 false");
    assert!(r.contains("ann"), "加入後 contains 應該是 true");
    assert!(!r.contains("bob"), "沒加入的 bob，contains 應該是 false");
    assert_eq!(r.len(), 1, "重複的名字不該被加兩次");
}

#[test]
fn concurrent_adds_no_duplicates() {
    let r = Arc::new(Registry::new());
    let mut handles = vec![];
    for _ in 0..4 {
        let r = Arc::clone(&r);
        handles.push(thread::spawn(move || {
            let mut added = 0;
            for i in 0..100 {
                if r.add(&format!("user{}", i)) {
                    added += 1;
                }
            }
            added
        }));
    }
    let mut total_added = 0;
    for h in handles {
        total_added += h.join().expect("執行緒 panic 了");
    }
    assert_eq!(r.len(), 100, "4 條執行緒加入同樣的 100 個名字，最後應該剛好 100 個（檢查和加入要在同一把寫鎖裡完成）");
    assert_eq!(total_added, 100, "add 回傳 true 的總次數應該剛好是 100");
}
