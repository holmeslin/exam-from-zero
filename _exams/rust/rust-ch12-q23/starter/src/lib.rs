use tokio_stream::{Stream, StreamExt};

/// 走訪 stream，把其中的偶數加總後回傳。
pub async fn sum_evens<S>(mut stream: S) -> i32
where
    S: Stream<Item = i32> + Unpin,
{
    let _ = stream.next(); // 提示：Stream 不能用 for 走訪
    todo!("用 while let 一個一個取值")
}
