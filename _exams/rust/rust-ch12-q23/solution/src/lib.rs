use tokio_stream::{Stream, StreamExt};

/// 走訪 stream，把其中的偶數加總後回傳。
pub async fn sum_evens<S>(mut stream: S) -> i32
where
    S: Stream<Item = i32> + Unpin,
{
    let mut total = 0;
    while let Some(x) = stream.next().await {
        if x % 2 == 0 {
            total += x;
        }
    }
    total
}
