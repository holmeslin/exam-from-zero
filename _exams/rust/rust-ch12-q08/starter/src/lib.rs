use std::future::Future;
use std::pin::Pin;
use std::sync::{Arc, Mutex};
use std::task::{Context, Poll, Waker};

// 完成方（Completer）與等待方（JoinHandle）共用的狀態：(結果, 等待者的 Waker)
struct Shared<T> {
    state: Mutex<(Option<T>, Option<Waker>)>,
}

pub struct Completer<T> {
    shared: Arc<Shared<T>>,
}

pub struct JoinHandle<T> {
    shared: Arc<Shared<T>>,
}

pub fn pair<T>() -> (Completer<T>, JoinHandle<T>) {
    let shared = Arc::new(Shared { state: Mutex::new((None, None)) });
    (Completer { shared: shared.clone() }, JoinHandle { shared })
}

impl<T> Completer<T> {
    pub fn complete(self, value: T) {
        let _ = (&self.shared.state, value);
        todo!("放進結果，並叫醒正在等的人")
    }
}

impl<T> Future for JoinHandle<T> {
    type Output = T;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<T> {
        let _ = (&self.shared.state, cx);
        todo!("結果好了就 Ready；還沒好就存下目前的 Waker 並回 Pending")
    }
}
