use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use tokio::sync::Semaphore;
use tokio::time::{sleep, Duration};

/// 模擬 count 個各要 100ms 的下載，同時最多只能有 limit 個在進行。
/// 回傳執行過程中觀察到的「最高同時下載數」。
pub async fn download_all(count: usize, limit: usize) -> usize {
    let current = Arc::new(AtomicUsize::new(0));
    let peak = Arc::new(AtomicUsize::new(0));
    let semaphore = Arc::new(Semaphore::new(limit));
    let mut handles = Vec::new();
    for _ in 0..count {
        let semaphore = Arc::clone(&semaphore);
        let current = Arc::clone(&current);
        let peak = Arc::clone(&peak);
        handles.push(tokio::spawn(async move {
            let _permit = semaphore.acquire().await.expect("semaphore 已關閉");
            let now = current.fetch_add(1, Ordering::SeqCst) + 1;
            peak.fetch_max(now, Ordering::SeqCst);
            sleep(Duration::from_millis(100)).await; // 假裝在下載
            current.fetch_sub(1, Ordering::SeqCst);
        }));
    }
    for handle in handles {
        handle.await.expect("task 失敗");
    }
    peak.load(Ordering::SeqCst)
}
