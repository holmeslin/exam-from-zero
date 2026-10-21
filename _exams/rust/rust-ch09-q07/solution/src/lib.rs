use std::sync::{Arc, Mutex};
use std::thread;

pub fn collect_squares(n: u32) -> Vec<u32> {
    let shared = Arc::new(Mutex::new(Vec::new()));
    let mut handles = vec![];
    for i in 0..n {
        let shared = Arc::clone(&shared);
        handles.push(thread::spawn(move || {
            shared.lock().expect("鎖失敗").push(i * i);
        }));
    }
    for h in handles {
        h.join().expect("執行緒發生錯誤");
    }
    let result = shared.lock().expect("鎖失敗").clone();
    result
}
