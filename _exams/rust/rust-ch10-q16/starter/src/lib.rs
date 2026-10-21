use std::sync::LazyLock;

pub fn next_id() -> u32 {
    0
}

pub static PRIMES: LazyLock<Vec<u32>> = LazyLock::new(|| Vec::new());

pub fn is_small_prime(n: u32) -> bool {
    todo!()
}
