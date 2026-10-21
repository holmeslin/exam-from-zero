use rust_ch12_q08::pair;
use std::future::Future;
use std::pin::Pin;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use std::task::{Context, Poll, Wake, Waker};

struct CountWake(AtomicUsize);

impl Wake for CountWake {
    fn wake(self: Arc<Self>) {
        self.0.fetch_add(1, Ordering::SeqCst);
    }
}

fn counting_waker() -> (Arc<CountWake>, Waker) {
    let c = Arc::new(CountWake(AtomicUsize::new(0)));
    (c.clone(), Waker::from(c))
}

#[test]
fn hidden_pending_then_woken_then_ready() {
    let (completer, mut handle) = pair::<i32>();
    let (count, waker) = counting_waker();
    let mut cx = Context::from_waker(&waker);
    assert_eq!(Pin::new(&mut handle).poll(&mut cx), Poll::Pending, "結果還沒好時 poll 應該回 Pending");
    assert_eq!(count.0.load(Ordering::SeqCst), 0, "還沒 complete 之前不應該 wake");
    completer.complete(42);
    assert_eq!(count.0.load(Ordering::SeqCst), 1, "complete 之後應該剛好 wake 一次等待者的 Waker");
    assert_eq!(Pin::new(&mut handle).poll(&mut cx), Poll::Ready(42), "被叫醒後再 poll 應該拿到 Ready(42)");
}

#[test]
fn hidden_complete_before_poll() {
    let (completer, mut handle) = pair::<String>();
    completer.complete(String::from("done"));
    let (count, waker) = counting_waker();
    let mut cx = Context::from_waker(&waker);
    assert_eq!(
        Pin::new(&mut handle).poll(&mut cx),
        Poll::Ready(String::from("done")),
        "先 complete 再 poll，第一次 poll 就該 Ready"
    );
    assert_eq!(count.0.load(Ordering::SeqCst), 0, "沒人在等的時候 complete 不需要 wake 任何人");
}

#[test]
fn hidden_wakes_latest_waker() {
    let (completer, mut handle) = pair::<u8>();
    let (first, waker_a) = counting_waker();
    let (second, waker_b) = counting_waker();
    assert!(Pin::new(&mut handle).poll(&mut Context::from_waker(&waker_a)).is_pending());
    assert!(Pin::new(&mut handle).poll(&mut Context::from_waker(&waker_b)).is_pending());
    completer.complete(7);
    assert_eq!(first.0.load(Ordering::SeqCst), 0, "只有最近一次 poll 給的 Waker 算數，舊的不該被叫醒");
    assert_eq!(second.0.load(Ordering::SeqCst), 1, "應該叫醒最近一次 poll 給的 Waker");
}
