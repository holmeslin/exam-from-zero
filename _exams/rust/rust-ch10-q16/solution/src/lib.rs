use std::sync::LazyLock;
use std::sync::atomic::{AtomicU32, Ordering};

static NEXT_ID: AtomicU32 = AtomicU32::new(1);

pub fn next_id() -> u32 {
    NEXT_ID.fetch_add(1, Ordering::Relaxed)
}

pub static PRIMES: LazyLock<Vec<u32>> = LazyLock::new(|| {
    let mut primes = Vec::new();
    for n in 2..50 {
        let mut prime = true;
        for d in 2..n {
            if n % d == 0 {
                prime = false;
                break;
            }
        }
        if prime {
            primes.push(n);
        }
    }
    primes
});

pub fn is_small_prime(n: u32) -> bool {
    PRIMES.contains(&n)
}
