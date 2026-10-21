use rust_ch09_q11::squares_via_channel;

#[test]
fn squares_any_order() {
    let mut got = squares_via_channel(vec![3, 1, 4, 10]);
    got.sort();
    assert_eq!(got, vec![1, 9, 16, 100], "應該收到每個數字的平方（順序不拘）");
}

#[test]
fn empty_input() {
    assert_eq!(squares_via_channel(vec![]), Vec::<u64>::new(), "沒有數字時回傳空的 Vec");
}
