use tokio::sync::broadcast;

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let (tx, mut rx1) = broadcast::channel::<i32>(16);
    let mut rx2 = tx.subscribe();

    for i in 1..=3 {
        tx.send(i * 10).expect("沒有接收端");
    }
    drop(tx);

    while let Ok(value) = rx1.recv().await {
        println!("rx1 收到 {}", value);
    }
    while let Ok(value) = rx2.recv().await {
        println!("rx2 收到 {}", value);
    }
}
