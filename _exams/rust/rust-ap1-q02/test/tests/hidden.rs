use rust_ap1_q02::ratio_above;

#[test]
fn check_ratio_above() {
    assert_eq!(ratio_above(100, 0, 10), false, "b 是 0 時要回傳 false，而且不能 panic");
    assert_eq!(ratio_above(0, 0, -5), false, "b 是 0 時要回傳 false，而且不能 panic");
    assert_eq!(ratio_above(100, 5, 10), true, "100 / 5 = 20 > 10，應該是 true");
    assert_eq!(ratio_above(100, 10, 10), false, "100 / 10 = 10 不大於 10，應該是 false");
    assert_eq!(ratio_above(-9, 3, -4), true, "-9 / 3 = -3 > -4，應該是 true");
}
