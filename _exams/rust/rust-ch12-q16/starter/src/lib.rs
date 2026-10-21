use tokio::time::{sleep, Duration};

pub async fn slow_number() -> i32 {
    sleep(Duration::from_millis(100)).await;
    7
}

pub async fn slow_text() -> String {
    sleep(Duration::from_millis(100)).await;
    String::from("hi")
}

/// 同時等 slow_number() 和 slow_text()，總共只該花約 100ms。
pub async fn fetch_both() -> (i32, String) {
    let n = slow_number().await;
    let t = slow_text().await;
    (n, t)
}
