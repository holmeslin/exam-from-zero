use rust_ch12_q06::{block_on, ThreadWaker};
use std::future::Future;
use std::pin::Pin;
use std::sync::atomic::{AtomicBool, AtomicUsize, Ordering};
use std::sync::Arc;
use std::task::{Context, Poll, Waker};
use std::thread;
use std::time::{Duration, Instant};

fn watchdog() {
    thread::spawn(|| {
        thread::sleep(Duration::from_secs(5));
        eprintln!("等了 5 秒還沒結束：executor 可能 park 之後沒有人把它叫醒（檢查 ThreadWaker::wake）");
        std::process::exit(1);
    });
}

// 第一次 poll 時開一條 Thread 睡 50ms，之後設好 done 並呼叫 wake
struct Timer {
    started: bool,
    done: Arc<AtomicBool>,
    polls: Arc<AtomicUsize>,
}

impl Future for Timer {
    type Output = &'static str;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<&'static str> {
        let this = self.get_mut();
        this.polls.fetch_add(1, Ordering::SeqCst);
        if this.done.load(Ordering::SeqCst) {
            return Poll::Ready("finished");
        }
        if !this.started {
            this.started = true;
            let waker = cx.waker().clone();
            let done = this.done.clone();
            thread::spawn(move || {
                thread::sleep(Duration::from_millis(50));
                done.store(true, Ordering::SeqCst);
                waker.wake();
            });
        }
        Poll::Pending
    }
}

#[test]
fn hidden_wake_unparks_thread() {
    watchdog();
    let waker = Waker::from(Arc::new(ThreadWaker { thread: thread::current() }));
    waker.wake(); // 先 wake（unpark 會留下 permit）
    let start = Instant::now();
    thread::park_timeout(Duration::from_secs(2));
    assert!(
        start.elapsed() < Duration::from_secs(1),
        "ThreadWaker::wake 應該 unpark 它記住的那條 Thread"
    );
}

#[test]
fn hidden_block_on_sleeps_instead_of_spinning() {
    watchdog();
    let polls = Arc::new(AtomicUsize::new(0));
    let timer = Timer { started: false, done: Arc::new(AtomicBool::new(false)), polls: polls.clone() };
    assert_eq!(block_on(timer), "finished", "block_on 應該回傳 Future 的結果");
    let n = polls.load(Ordering::SeqCst);
    assert!(
        n <= 10,
        "等 50ms 的 Future 被 poll 了 {} 次：executor 拿到 Pending 時應該 thread::park() 睡覺，而不是一直空轉",
        n
    );
}
