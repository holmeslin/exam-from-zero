use std::future::Future;
use tokio::time::{sleep, Duration};

/// 最多等 fut ms 毫秒：時間內完成就回傳 Some(結果)，逾時就放棄（取消 fut）並回傳 None。
pub async fn with_timeout<F: Future>(fut: F, ms: u64) -> Option<F::Output> {
    let _ = (sleep, Duration::from_millis(ms)); // TODO：用 tokio::select! 讓 fut 和計時器賽跑
    Some(fut.await)
}
