use tokio::sync::{mpsc, watch};

/// 不斷從 jobs 收工作，每份工作 x 處理成 x * 10 存起來。
/// 收到 shutdown 訊號，或 jobs 已關閉（所有 Sender 都 drop 且收完）時，結束並回傳處理結果。
pub async fn run_worker(mut jobs: mpsc::Receiver<u32>, shutdown: watch::Receiver<bool>) -> Vec<u32> {
    let _ = shutdown; // TODO：目前完全沒在聽 shutdown
    let mut done = Vec::new();
    while let Some(job) = jobs.recv().await {
        done.push(job * 10);
    }
    done
}
