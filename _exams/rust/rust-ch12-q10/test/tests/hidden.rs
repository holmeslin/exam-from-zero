use rust_ch12_q10::add_twice;
use std::future::Future;
use std::panic::{catch_unwind, AssertUnwindSafe};
use std::pin::Pin;
use std::task::{Context, Poll, Waker};

#[test]
fn hidden_poll_sequence() {
    let mut cx = Context::from_waker(Waker::noop());
    let mut fut = add_twice(3, 4);
    assert_eq!(Pin::new(&mut fut).poll(&mut cx), Poll::Pending, "第 1 次 poll：卡在第一個 yield_now().await，應該是 Pending");
    assert_eq!(Pin::new(&mut fut).poll(&mut cx), Poll::Pending, "第 2 次 poll：卡在第二個 yield_now().await，應該是 Pending");
    assert_eq!(Pin::new(&mut fut).poll(&mut cx), Poll::Ready(14), "第 3 次 poll：應該 Ready((3 + 4) * 2)");
}

#[test]
fn hidden_other_numbers() {
    let mut cx = Context::from_waker(Waker::noop());
    let mut fut = add_twice(-10, 2);
    let mut result = None;
    for _ in 0..10 {
        if let Poll::Ready(v) = Pin::new(&mut fut).poll(&mut cx) {
            result = Some(v);
            break;
        }
    }
    assert_eq!(result, Some(-16), "add_twice(-10, 2) 應該得到 -16");
}

#[test]
fn hidden_poll_after_ready_panics() {
    let mut cx = Context::from_waker(Waker::noop());
    let mut fut = add_twice(1, 1);
    for _ in 0..3 {
        let _ = Pin::new(&mut fut).poll(&mut cx);
    }
    let again = catch_unwind(AssertUnwindSafe(|| {
        let _ = Pin::new(&mut fut).poll(&mut cx);
    }));
    assert!(again.is_err(), "Ready 之後（Done 狀態）再被 poll 應該 panic");
}
