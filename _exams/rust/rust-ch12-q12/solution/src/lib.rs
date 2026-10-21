use std::future::Future;
use std::pin::pin;
use std::task::{Context, Poll, Waker};

/// 把 fut poll 一次：已經好了就回傳 Some(結果)，還沒好就回傳 None。
pub fn poll_once<F: Future>(fut: F) -> Option<F::Output> {
    let mut fut = pin!(fut);
    let mut cx = Context::from_waker(Waker::noop());
    match fut.as_mut().poll(&mut cx) {
        Poll::Ready(value) => Some(value),
        Poll::Pending => None,
    }
}
