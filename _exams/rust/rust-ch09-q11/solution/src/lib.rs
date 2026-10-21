use std::sync::mpsc;
use std::thread;

pub fn squares_via_channel(nums: Vec<u64>) -> Vec<u64> {
    let (tx, rx) = mpsc::channel();
    for n in nums {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(n * n).expect("發送失敗");
        });
    }
    drop(tx);
    rx.into_iter().collect()
}
