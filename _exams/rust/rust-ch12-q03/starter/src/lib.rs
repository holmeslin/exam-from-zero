use std::future::Future;
use std::task::{Context, Poll, Waker};

/// 不斷 poll 傳進來的 future，直到它回 Ready，再把結果回傳。
pub fn block_on<F: Future>(future: F) -> F::Output {
    // 提示：Box::pin、Context::from_waker(Waker::noop())、loop + match
    let _ = (future, Context::from_waker(Waker::noop()), Poll::Ready(()));
    todo!("實作最陽春的 executor")
}
