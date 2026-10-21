use rust_ch12_q13::sum_to;
use std::future::Future;
use std::task::{Context, Poll, Waker};

fn run<F: Future>(future: F) -> F::Output {
    let mut future = Box::pin(future);
    let mut cx = Context::from_waker(Waker::noop());
    for _ in 0..1000 {
        if let Poll::Ready(v) = future.as_mut().poll(&mut cx) {
            return v;
        }
    }
    panic!("poll 了 1000 次還沒完成");
}

#[test]
fn hidden_sum_to() {
    assert_eq!(run(sum_to(0)), 0, "sum_to(0) 應該是 0");
    assert_eq!(run(sum_to(1)), 1, "sum_to(1) 應該是 1");
    assert_eq!(run(sum_to(10)), 55, "sum_to(10) 應該是 55");
    assert_eq!(run(sum_to(100)), 5050, "sum_to(100) 應該是 5050");
}
