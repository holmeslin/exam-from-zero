use rust_ch05_q04::find_index;

#[test]
fn hidden_found() {
    assert_eq!(find_index(&[4, 8, 15, 16], 15), Some(2), "15 在索引 2");
    assert_eq!(find_index(&[5, 1, 5], 5), Some(0), "有重複時回傳第一個出現的位置");
}

#[test]
fn hidden_not_found() {
    assert_eq!(find_index(&[1, 2, 3], 9), None, "找不到要回傳 None");
    assert_eq!(find_index(&[], 1), None, "空切片要回傳 None");
}
