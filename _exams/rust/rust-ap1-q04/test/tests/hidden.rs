use rust_ap1_q04::find_pair;

#[test]
fn check_find_pair() {
    assert_eq!(find_pair(&[2, 7, 11, 15], 9), Some((0, 1)), "2 + 7 = 9");
    assert_eq!(find_pair(&[1, 5, 3, 4, 2], 6), Some((0, 1)), "要回傳第一組：i 最小，i 相同時 j 最小");
    assert_eq!(find_pair(&[3, 1, 4, 3], 6), Some((0, 3)), "3 + 3 = 6，同一個元素不能用兩次");
    assert_eq!(find_pair(&[1, 2, 3], 100), None, "找不到要回傳 None");
    assert_eq!(find_pair(&[], 0), None, "空切片要回傳 None");
    assert_eq!(find_pair(&[5], 10), None, "只有一個元素時不能自己加自己");
}
