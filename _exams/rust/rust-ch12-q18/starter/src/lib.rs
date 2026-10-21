use tokio::sync::mpsc;

/// 開 producers 個生產者 task，每個都把 1..=per 送進 channel；
/// 消費者把收到的數字全部加總後回傳。
pub async fn sum_from_producers(producers: u32, per: u32) -> u64 {
    let (tx, mut rx) = mpsc::channel::<u32>(4);
    for _ in 0..producers {
        let tx = tx.clone();
        tokio::spawn(async move {
            for k in 1..=per {
                tx.send(k).await.expect("接收端已關閉");
            }
        });
    }
    let mut total = 0u64;
    while let Some(value) = rx.recv().await {
        total += value as u64;
    }
    total
}
