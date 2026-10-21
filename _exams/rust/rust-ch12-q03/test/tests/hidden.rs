use rust_ch12_q03::block_on;
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

// 前 left 次 poll 回 Pending，之後回 Ready(總共被 poll 的次數)
struct PendingTimes {
    left: u32,
    polls: u32,
}

impl Future for PendingTimes {
    type Output = u32;
    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<u32> {
        let this = self.get_mut();
        this.polls += 1;
        if this.left == 0 {
            Poll::Ready(this.polls)
        } else {
            this.left -= 1;
            Poll::Pending
        }
    }
}

#[test]
fn hidden_ready_immediately() {
    assert_eq!(block_on(async { 1 + 2 }), 3, "async {{ 1 + 2 }} 應該得到 3");
}

#[test]
fn hidden_keeps_polling_until_ready() {
    let polls = block_on(PendingTimes { left: 3, polls: 0 });
    assert_eq!(polls, 4, "前 3 次回 Pending，block_on 應該 poll 到第 4 次拿到 Ready");
}

#[test]
fn hidden_await_inside_async_block() {
    let v = block_on(async {
        let n = PendingTimes { left: 2, polls: 0 }.await;
        n * 10
    });
    assert_eq!(v, 30, "async block 裡 .await 一個要 poll 3 次的 Future，結果應該是 30");
}
