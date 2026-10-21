use std::future::Future;
use std::task::{Context, Poll, Waker};

/// 不斷 poll 傳進來的 future，直到它回 Ready，再把結果回傳。
pub fn block_on<F: Future>(future: F) -> F::Output {
    let mut future = Box::pin(future);
    let mut cx = Context::from_waker(Waker::noop());
    loop {
        match future.as_mut().poll(&mut cx) {
            Poll::Ready(value) => return value,
            Poll::Pending => {}
        }
    }
}
