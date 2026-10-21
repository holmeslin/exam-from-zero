use std::thread;

pub fn parallel_sum(data: &[i64]) -> i64 {
    let mid = data.len() / 2;
    let (left, right) = (&data[..mid], &data[mid..]);
    thread::scope(|s| {
        let h1 = s.spawn(|| left.iter().sum::<i64>());
        let h2 = s.spawn(|| right.iter().sum::<i64>());
        h1.join().expect("執行緒發生錯誤") + h2.join().expect("執行緒發生錯誤")
    })
}
