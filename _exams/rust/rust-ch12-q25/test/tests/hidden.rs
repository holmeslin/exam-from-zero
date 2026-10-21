use rust_ch12_q25::run_worker;
use tokio::sync::{mpsc, watch};
use tokio::time::{sleep, timeout, Duration};

#[tokio::test(start_paused = true)]
async fn hidden_stops_when_jobs_closed() {
    let (job_tx, job_rx) = mpsc::channel(8);
    let (_shutdown_tx, shutdown_rx) = watch::channel(false);
    for x in 1..=3 {
        job_tx.send(x).await.expect("送出工作失敗");
    }
    drop(job_tx);
    let done = timeout(Duration::from_secs(5), run_worker(job_rx, shutdown_rx))
        .await
        .expect("jobs 已經關閉，run_worker 卻一直沒結束");
    assert_eq!(done, vec![10, 20, 30], "三份工作 1、2、3 應該處理成 10、20、30");
}

#[tokio::test(start_paused = true)]
async fn hidden_stops_on_shutdown() {
    let (_job_tx, job_rx) = mpsc::channel::<u32>(8); // jobs 不關閉，也沒有工作
    let (shutdown_tx, shutdown_rx) = watch::channel(false);
    let worker = tokio::spawn(run_worker(job_rx, shutdown_rx));
    sleep(Duration::from_millis(10)).await;
    shutdown_tx.send(true).expect("worker 沒在聽 shutdown");
    let done = timeout(Duration::from_secs(5), worker)
        .await
        .expect("送出 shutdown 之後 run_worker 一直沒結束：要用 select! 同時等工作和 shutdown")
        .expect("worker task panic 了");
    assert_eq!(done, Vec::<u32>::new(), "沒有任何工作，結果應該是空的");
}

#[tokio::test(start_paused = true)]
async fn hidden_work_then_shutdown() {
    let (job_tx, job_rx) = mpsc::channel(8);
    let (shutdown_tx, shutdown_rx) = watch::channel(false);
    let worker = tokio::spawn(run_worker(job_rx, shutdown_rx));
    job_tx.send(4).await.expect("送出工作失敗");
    sleep(Duration::from_millis(10)).await; // 讓 worker 先處理掉這份工作
    shutdown_tx.send(true).expect("worker 沒在聽 shutdown");
    let done = timeout(Duration::from_secs(5), worker)
        .await
        .expect("送出 shutdown 之後 run_worker 一直沒結束：要用 select! 同時等工作和 shutdown")
        .expect("worker task panic 了");
    assert_eq!(done, vec![40], "先處理完工作 4，收到 shutdown 後結束");
}
