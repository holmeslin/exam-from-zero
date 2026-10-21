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
        this.polls += 1;
        if this.remaining == 0 {
            Poll::Ready(this.polls)
        } else {
            this.remaining -= 1;
            Poll::Pending
        }
    }
}
