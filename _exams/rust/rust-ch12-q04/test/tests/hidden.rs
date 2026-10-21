use rust_ch12_q04::Countdown;
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll, Waker};

#[test]
fn hidden_countdown_two() {
    let mut cx = Context::from_waker(Waker::noop());
    let mut cd = Countdown::new(2);
    assert_eq!(Pin::new(&mut cd).poll(&mut cx), Poll::Pending, "Countdown::new(2) 第 1 次 poll 應該是 Pending");
    assert_eq!(Pin::new(&mut cd).poll(&mut cx), Poll::Pending, "Countdown::new(2) 第 2 次 poll 應該是 Pending");
    assert_eq!(Pin::new(&mut cd).poll(&mut cx), Poll::Ready(3), "Countdown::new(2) 第 3 次 poll 應該是 Ready(3)");
}

#[test]
fn hidden_countdown_zero() {
    let mut cx = Context::from_waker(Waker::noop());
    let mut cd = Countdown::new(0);
    assert_eq!(Pin::new(&mut cd).poll(&mut cx), Poll::Ready(1), "Countdown::new(0) 第一次 poll 就該是 Ready(1)");
}

#[test]
fn hidden_countdown_five() {
    let mut cx = Context::from_waker(Waker::noop());
    let mut cd = Countdown::new(5);
    for i in 1..=5 {
        assert_eq!(Pin::new(&mut cd).poll(&mut cx), Poll::Pending, "Countdown::new(5) 第 {} 次 poll 應該是 Pending", i);
    }
    assert_eq!(Pin::new(&mut cd).poll(&mut cx), Poll::Ready(6), "Countdown::new(5) 第 6 次 poll 應該是 Ready(6)");
}
