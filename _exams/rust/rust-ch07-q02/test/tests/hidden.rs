use rust_ch07_q02::math::advanced::power;
use rust_ch07_q02::math::basic::add;

#[test]
fn hidden_nested_mod() {
    assert_eq!(add(3, 5), 8, "math::basic::add(3, 5) 應該是 8");
    assert_eq!(power(2, 10), 1024, "math::advanced::power(2, 10) 應該是 1024");
    assert_eq!(power(7, 0), 1, "任何數的 0 次方都是 1");
    assert_eq!(power(-3, 3), -27, "power(-3, 3) 應該是 -27");
}
