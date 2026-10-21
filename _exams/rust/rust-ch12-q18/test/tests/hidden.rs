use rust_ch12_q18::sum_from_producers;
use tokio::time::{timeout, Duration};

async fn run(producers: u32, per: u32) -> u64 {
    timeout(Duration::from_secs(5), sum_from_producers(producers, per))
        .await
        .expect("sum_from_producers 一直沒有結束：rx.recv() 等不到 None，是不是還有 Sender 沒被 drop？")
}

#[tokio::test(start_paused = true)]
async fn hidden_three_producers() {
    assert_eq!(run(3, 10).await, 165, "3 個生產者各送 1..=10，總和應該是 165");
}

#[tokio::test(start_paused = true)]
async fn hidden_no_producers() {
    assert_eq!(run(0, 10).await, 0, "沒有生產者時應該立刻回傳 0");
}
