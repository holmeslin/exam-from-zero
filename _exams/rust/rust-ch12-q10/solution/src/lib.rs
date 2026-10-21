use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

/// 第一次 poll 回 Pending（並請 executor 再來 poll），第二次回 Ready。
pub struct YieldNow {
    yielded: bool,
}

pub fn yield_now() -> YieldNow {
    YieldNow { yielded: false }
}

impl Future for YieldNow {
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

// 手寫這個 async fn 背後的狀態機：
//
// async fn add_twice(a: i32, b: i32) -> i32 {
//     yield_now().await;
//     let sum = a + b;
//     yield_now().await;
//     sum * 2
// }
pub enum AddTwice {
    Start { a: i32, b: i32 },
    First { a: i32, b: i32, y: YieldNow },
    Second { sum: i32, y: YieldNow },
    Done,
}

pub fn add_twice(a: i32, b: i32) -> AddTwice {
    AddTwice::Start { a, b }
}

impl Future for AddTwice {
    type Output = i32;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<i32> {
        let this = self.get_mut();
        loop {
            match this {
                AddTwice::Start { a, b } => {
                    *this = AddTwice::First { a: *a, b: *b, y: yield_now() };
                }
                AddTwice::First { a, b, y } => match Pin::new(y).poll(cx) {
                    Poll::Ready(()) => {
                        let sum = *a + *b;
                        *this = AddTwice::Second { sum, y: yield_now() };
                    }
                    Poll::Pending => return Poll::Pending,
                },
                AddTwice::Second { sum, y } => match Pin::new(y).poll(cx) {
                    Poll::Ready(()) => {
                        let result = *sum * 2;
                        *this = AddTwice::Done;
                        return Poll::Ready(result);
                    }
                    Poll::Pending => return Poll::Pending,
                },
                AddTwice::Done => panic!("不該在 Ready 之後再 poll"),
            }
        }
    }
}
