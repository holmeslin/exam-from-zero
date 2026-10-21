use std::future::Future;
use std::sync::Arc;
use std::task::{Context, Poll, Wake, Waker};
use std::thread::Thread;

pub struct ThreadWaker {
    pub thread: Thread,
}

impl Wake for ThreadWaker {
    fn wake(self: Arc<Self>) {
        todo!("被喚醒時要做什麼？")
    }
}

// 目前是第 6 集那個會空轉的版本：請改成 Pending 時睡覺、被 Waker 叫醒才再 poll
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
