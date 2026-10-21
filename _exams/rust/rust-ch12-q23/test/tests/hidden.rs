use rust_ch12_q23::sum_evens;
use tokio_stream::StreamExt;

#[tokio::test]
async fn hidden_sum_evens_basic() {
    assert_eq!(sum_evens(tokio_stream::iter(vec![1, 2, 3, 4])).await, 6, "1, 2, 3, 4 的偶數和是 6");
}

#[tokio::test]
async fn hidden_sum_evens_empty_and_odd() {
    assert_eq!(sum_evens(tokio_stream::iter(Vec::new())).await, 0, "空的 stream 應該回傳 0");
    assert_eq!(sum_evens(tokio_stream::iter(vec![1, 3, 5])).await, 0, "沒有偶數時應該回傳 0");
}

#[tokio::test]
async fn hidden_sum_evens_mapped_stream() {
    let stream = tokio_stream::iter(1..=5).map(|x| x * 3); // 3, 6, 9, 12, 15
    assert_eq!(sum_evens(stream).await, 18, "3, 6, 9, 12, 15 的偶數和是 18");
}
