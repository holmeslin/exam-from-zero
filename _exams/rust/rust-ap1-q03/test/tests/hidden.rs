use rust_ap1_q03::first_square_above;

#[test]
fn check_first_square_above() {
    assert_eq!(first_square_above(100), 121, "大於 100 的第一個平方數是 121（100 本身不算）");
    assert_eq!(first_square_above(0), 1, "大於 0 的第一個平方數是 1");
    assert_eq!(first_square_above(15), 16, "大於 15 的第一個平方數是 16");
    assert_eq!(first_square_above(16), 25, "大於 16 的第一個平方數是 25");
}
