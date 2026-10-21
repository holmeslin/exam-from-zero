/// 用遞迴計算 1 + 2 + ... + n（n 為 0 時回傳 0）。
pub async fn sum_to(n: u64) -> u64 {
    if n == 0 {
        0
    } else {
        n + Box::pin(sum_to(n - 1)).await
    }
}
