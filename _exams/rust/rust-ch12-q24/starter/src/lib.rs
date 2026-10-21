use tokio::task::JoinSet;
use tokio::time::{sleep, Duration};

/// delays[i] 是第 i 個工作要花的毫秒數。所有工作同時開始，
/// 回傳它們「完成的順序」（以工作的索引表示）。
pub async fn finish_order(delays: Vec<u64>) -> Vec<usize> {
    let _ = JoinSet::<usize>::new(); // TODO：改用 JoinSet
    let mut order = Vec::new();
    for (i, ms) in delays.into_iter().enumerate() {
        sleep(Duration::from_millis(ms)).await;
        order.push(i);
    }
    order
}
