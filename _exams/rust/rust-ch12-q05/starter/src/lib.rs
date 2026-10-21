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
        // 提示：for slot in &mut this.futures { ... slot.take() ... }
        let _ = (&mut this.futures, cx);
        todo!("每個還沒完成的子 Future 各 poll 一次")
    }
}
