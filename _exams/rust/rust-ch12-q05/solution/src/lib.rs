use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

pub type BoxFuture = Pin<Box<dyn Future<Output = ()>>>;

pub struct JoinAll {
    futures: Vec<Option<BoxFuture>>,
}

pub fn join_all(futures: Vec<BoxFuture>) -> JoinAll {
    JoinAll {
        futures: futures.into_iter().map(Some).collect(),
    }
}

impl Future for JoinAll {
    type Output = ();

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<()> {
        let this = self.get_mut();
        let mut all_done = true;
        for slot in &mut this.futures {
            if let Some(mut fut) = slot.take() {
                match fut.as_mut().poll(cx) {
                    Poll::Ready(()) => {}
                    Poll::Pending => {
                        *slot = Some(fut);
                        all_done = false;
                    }
                }
            }
        }
        if all_done { Poll::Ready(()) } else { Poll::Pending }
    }
}
