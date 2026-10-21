use rust_ch04_q03::add_bonus;

#[test]
fn hidden_add_bonus() {
    let mut s = 80;
    add_bonus(&mut s, 5);
    assert_eq!(s, 85, "80 加 5 之後應該是 85");
    add_bonus(&mut s, 10);
    assert_eq!(s, 95, "再加 10 之後應該是 95");
    add_bonus(&mut s, 0);
    assert_eq!(s, 95, "加 0 不應該改變");
}
