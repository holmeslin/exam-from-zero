use rust_ch12_q21::with_timeout;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use tokio::time::{sleep, Duration, Instant};

async fn work(ms: u64, value: i32, finished: Arc<AtomicBool>) -> i32 {
    sleep(Duration::from_millis(ms)).await;
    finished.store(true, Ordering::SeqCst);
    value
}

#[tokio::test(start_paused = true)]
async fn hidden_finishes_in_time() {
    let flag = Arc::new(AtomicBool::new(false));
    let start = Instant::now();
    let r = with_timeout(work(50, 1, flag), 100).await;
    assert_eq!(r, Some(1), "50ms 的工作、期限 100ms，應該回傳 Some(1)");
    assert!(start.elapsed() < Duration::from_millis(80), "工作做完就該立刻回傳，不用等到期限");
}

#[tokio::test(start_paused = true)]
async fn hidden_times_out_and_cancels() {
    let flag = Arc::new(AtomicBool::new(false));
    let start = Instant::now();
    let r = with_timeout(work(500, 2, flag.clone()), 100).await;
    let elapsed = start.elapsed();
    assert_eq!(r, None, "500ms 的工作、期限 100ms，應該逾時回傳 None");
    assert!(
        elapsed < Duration::from_millis(150),
        "應該在約 100ms 時就放棄，實際等了 {:?}",
        elapsed
    );
    sleep(Duration::from_secs(1)).await;
    assert!(!flag.load(Ordering::SeqCst), "逾時後那個工作應該被 drop（取消），不該再跑完");
}
