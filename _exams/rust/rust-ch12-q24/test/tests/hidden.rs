use rust_ch12_q24::finish_order;
use tokio::time::{Duration, Instant};

#[tokio::test(start_paused = true)]
async fn hidden_order_by_finish_time() {
    let start = Instant::now();
    let order = finish_order(vec![300, 100, 200]).await;
    let elapsed = start.elapsed();
    assert_eq!(order, vec![1, 2, 0], "100ms 的工作 1 最先完成，接著是工作 2，最後是工作 0");
    assert!(
        elapsed < Duration::from_millis(350),
        "工作應該同時進行，約 300ms 就全部完成，實際花了 {:?}",
        elapsed
    );
}

#[tokio::test(start_paused = true)]
async fn hidden_order_more() {
    let order = finish_order(vec![40, 10, 50, 20, 30]).await;
    assert_eq!(order, vec![1, 3, 4, 0, 2], "完成順序應該依照各自的延遲由短到長");
}

#[tokio::test(start_paused = true)]
async fn hidden_order_empty() {
    assert_eq!(finish_order(Vec::new()).await, Vec::<usize>::new(), "沒有工作時回傳空的 Vec");
}
