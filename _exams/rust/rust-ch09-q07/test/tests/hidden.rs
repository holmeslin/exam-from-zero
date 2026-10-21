use rust_ch09_q07::collect_squares;

#[test]
fn five_threads() {
    let mut got = collect_squares(5);
    got.sort();
    assert_eq!(got, vec![0, 1, 4, 9, 16], "應該收齊 0..5 每個數的平方（順序不拘）");
}

#[test]
fn zero_threads() {
    assert_eq!(collect_squares(0), Vec::<u32>::new(), "n 為 0 時回傳空的 Vec");
}

#[test]
fn eight_threads() {
    let mut got = collect_squares(8);
    got.sort();
    assert_eq!(got, vec![0, 1, 4, 9, 16, 25, 36, 49], "應該收齊 0..8 每個數的平方（順序不拘）");
}
