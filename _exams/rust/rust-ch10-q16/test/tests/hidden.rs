use rust_ch10_q16::{is_small_prime, next_id, PRIMES};

#[test]
fn hidden_next_id() {
    let a = next_id();
    let b = next_id();
    let c = next_id();
    assert!(a >= 1, "id 應該從 1 開始，拿到 {}", a);
    assert_eq!(b, a + 1, "每次呼叫 next_id 應該加 1");
    assert_eq!(c, b + 1, "每次呼叫 next_id 應該加 1");

    let mut ids = Vec::new();
    std::thread::scope(|s| {
        let handles: Vec<_> = (0..4)
            .map(|_| s.spawn(|| (0..200).map(|_| next_id()).collect::<Vec<u32>>()))
            .collect();
        for h in handles {
            ids.extend(h.join().unwrap());
        }
    });
    ids.sort();
    ids.dedup();
    assert_eq!(ids.len(), 800, "多個執行緒同時呼叫 next_id 時拿到了重複的 id");
}

#[test]
fn hidden_primes() {
    assert_eq!(
        *PRIMES,
        vec![2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47],
        "PRIMES 應該是 50 以下所有質數（由小到大）"
    );
    assert!(is_small_prime(47), "47 是質數");
    assert!(!is_small_prime(1), "1 不是質數");
    assert!(!is_small_prime(49), "49 不是質數");
    assert!(!is_small_prime(53), "53 不在 50 以下");
}
