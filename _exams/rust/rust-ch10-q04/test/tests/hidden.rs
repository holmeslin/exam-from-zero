use rust_ch10_q04::{gcd, GCD_84_36};

// 能放在 const 裡，代表 gcd 是 const fn
const HIDDEN_G: u64 = gcd(48, 18);

#[test]
fn hidden_const_gcd() {
    assert_eq!(HIDDEN_G, 6, "gcd(48, 18) 應該是 6");
    assert_eq!(GCD_84_36, 12, "GCD_84_36 應該是 12");
}

#[test]
fn hidden_runtime_gcd() {
    assert_eq!(gcd(17, 5), 1, "gcd(17, 5)");
    assert_eq!(gcd(0, 7), 7, "gcd(0, 7)");
    assert_eq!(gcd(7, 0), 7, "gcd(7, 0)");
    assert_eq!(gcd(100, 75), 25, "gcd(100, 75)");
}
