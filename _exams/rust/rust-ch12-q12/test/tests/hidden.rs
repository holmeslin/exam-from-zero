use rust_ch12_q12::poll_once;
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

struct YieldOnce {
    yielded: bool,
}

impl Future for YieldOnce {
    type Output = ();
    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<()> {
        let this = self.get_mut();
        if this.yielded {
            Poll::Ready(())
        } else {
            this.yielded = true;
            Poll::Pending
        }
    }
}

async fn other() {}

#[test]
fn hidden_ready_async_block() {
    assert_eq!(poll_once(async { 5 }), Some(5), "async {{ 5 }} poll 一次就該 Ready");
}

#[test]
fn hidden_pending_async_block() {
    let fut = async {
        YieldOnce { yielded: false }.await;
        1
    };
    assert_eq!(poll_once(fut), None, "卡在 .await 的 Future poll 一次應該還沒好");
}

#[test]
fn hidden_borrow_across_await() {
    // 跨 .await 借用區域變數：這種 Future 不是 Unpin
    let fut = async {
        let s = String::from("hello");
        let r = &s;
        other().await;
        r.len()
    };
    assert_eq!(poll_once(fut), Some(5), "這個 Future poll 一次就能跑完，應該得到 Some(5)");
}
