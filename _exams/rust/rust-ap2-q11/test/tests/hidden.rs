use rust_ap2_q11::run_each;
use std::future::Future;
use std::task::{Context, Poll, Waker};

fn test_block_on<F: Future>(future: F) -> F::Output {
    let mut future = Box::pin(future);
    let mut cx = Context::from_waker(Waker::noop());
    loop {
        if let Poll::Ready(value) = future.as_mut().poll(&mut cx) {
            return value;
        }
    }
}

#[test]
fn runs_mutating_closure_in_order() {
    let mut log: Vec<String> = Vec::new();
    test_block_on(run_each(&["alpha", "beta", "gamma"], async |item: &str| {
        std::future::ready(()).await;
        log.push(item.to_uppercase());
    }));
    assert_eq!(log, vec!["ALPHA", "BETA", "GAMMA"], "應該依序對每個 item 執行一次 action");
}

#[test]
fn empty_items() {
    let mut count = 0;
    test_block_on(run_each(&[], async |_item: &str| {
        count += 1;
    }));
    assert_eq!(count, 0, "沒有 item 時 action 不該被呼叫");
}
