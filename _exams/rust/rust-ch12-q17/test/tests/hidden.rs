use rust_ch12_q17::download_all;
use tokio::time::{Duration, Instant};

#[tokio::test(start_paused = true)]
async fn hidden_limit_three_of_ten() {
    let start = Instant::now();
    let peak = download_all(10, 3).await;
    let elapsed = start.elapsed();
    assert_eq!(peak, 3, "limit 是 3，最高同時下載數應該剛好是 3");
    assert!(
        elapsed >= Duration::from_millis(400) && elapsed < Duration::from_millis(450),
        "10 個下載、一次 3 個，應該分 4 輪、約 400ms，實際花了 {:?}",
        elapsed
    );
}

#[tokio::test(start_paused = true)]
async fn hidden_limit_larger_than_count() {
    assert_eq!(download_all(2, 5).await, 2, "只有 2 個下載時，最高同時數是 2");
}

#[tokio::test(start_paused = true)]
async fn hidden_limit_one() {
    let start = Instant::now();
    assert_eq!(download_all(3, 1).await, 1, "limit 是 1 時一次只能一個");
    assert!(start.elapsed() >= Duration::from_millis(300), "limit 1、3 個下載應該要約 300ms");
}
