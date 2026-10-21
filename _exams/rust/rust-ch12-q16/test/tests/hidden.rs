use rust_ch12_q16::fetch_both;
use tokio::time::{Duration, Instant};

#[tokio::test(start_paused = true)]
async fn hidden_fetch_both_concurrently() {
    let start = Instant::now();
    let (n, t) = fetch_both().await;
    let elapsed = start.elapsed();
    assert_eq!(n, 7, "第一個值應該是 slow_number() 的 7");
    assert_eq!(t, "hi", "第二個值應該是 slow_text() 的 \"hi\"");
    assert!(
        elapsed < Duration::from_millis(150),
        "花了 {:?}：兩個各要 100ms 的工作應該同時等（約 100ms），而不是一個接一個（200ms）",
        elapsed
    );
}
