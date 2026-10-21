use rust_ch12_q05::{join_all, BoxFuture};
use std::cell::RefCell;
use std::future::Future;
use std::pin::Pin;
use std::rc::Rc;
use std::task::{Context, Poll, Waker};

// 第一次 poll 回 Pending，第二次回 Ready
struct YieldOnce {
    yielded: bool,
}

impl Future for YieldOnce {
    type Output = ();
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<()> {
        let this = self.get_mut();
        if this.yielded {
            Poll::Ready(())
        } else {
            this.yielded = true;
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}

// 第一次 poll 就 Ready；Ready 之後再被 poll 會 panic（契約二）
struct OnlyOnce {
    done: bool,
}

impl Future for OnlyOnce {
    type Output = ();
    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<()> {
        let this = self.get_mut();
        assert!(!this.done, "已經回過 Ready 的子 Future 又被 poll 了（違反契約二）");
        this.done = true;
        Poll::Ready(())
    }
}

fn worker(name: &'static str, log: Rc<RefCell<Vec<String>>>) -> BoxFuture {
    Box::pin(async move {
        log.borrow_mut().push(format!("{}1", name));
        YieldOnce { yielded: false }.await;
        log.borrow_mut().push(format!("{}2", name));
    })
}

// 回傳 JoinAll 被 poll 幾次才 Ready
fn drive(mut fut: impl Future<Output = ()> + Unpin) -> u32 {
    let mut cx = Context::from_waker(Waker::noop());
    for n in 1..=100 {
        if Pin::new(&mut fut).poll(&mut cx).is_ready() {
            return n;
        }
    }
    panic!("poll 了 100 次 JoinAll 都還沒 Ready");
}

#[test]
fn hidden_interleaves_workers() {
    let log = Rc::new(RefCell::new(Vec::new()));
    let polls = drive(join_all(vec![worker("a", log.clone()), worker("b", log.clone())]));
    assert_eq!(
        *log.borrow(),
        vec!["a1", "b1", "a2", "b2"],
        "JoinAll 每輪應該把每個子 Future 各推進一次，兩個 worker 要交錯執行"
    );
    assert_eq!(polls, 2, "兩個 worker 各只需等一次，JoinAll 應該在第 2 次 poll 時 Ready");
}

#[test]
fn hidden_empty_is_ready() {
    assert_eq!(drive(join_all(Vec::new())), 1, "沒有子 Future 時，第一次 poll 就該 Ready");
}

#[test]
fn hidden_finished_not_polled_again() {
    let log = Rc::new(RefCell::new(Vec::new()));
    let futures: Vec<BoxFuture> = vec![Box::pin(OnlyOnce { done: false }), worker("c", log.clone())];
    let polls = drive(join_all(futures));
    assert_eq!(polls, 2, "應該在第 2 次 poll 時 Ready");
    assert_eq!(*log.borrow(), vec!["c1", "c2"], "worker c 應該完整跑完");
}
