use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

pub struct Countdown {
    remaining: u32,
    polls: u32,
}

impl Countdown {
    pub fn new(remaining: u32) -> Countdown {
        Countdown { remaining, polls: 0 }
    }
}

impl Future for Countdown {
    type Output = u32;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<u32> {
        let this = self.get_mut();
        let _ = (this.remaining, this.polls, Poll::Ready(0));
        todo!("依題目規則回傳 Pending 或 Ready")
    }
}
