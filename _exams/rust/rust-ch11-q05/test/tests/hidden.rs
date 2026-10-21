use rust_ch11_q05::compare;

#[test]
fn hidden_compare_basic() {
    let (both, only_a) = compare(&[5, 1, 2, 2, 3], &[4, 3, 2, 3]);
    assert_eq!(both, vec![2, 3], "兩邊都有的是 2、3（不重複、由小到大）");
    assert_eq!(only_a, vec![1, 5], "只在 a 的是 1、5（由小到大）");
}

#[test]
fn hidden_compare_disjoint() {
    let (both, only_a) = compare(&[9, 7, 7], &[1]);
    assert_eq!(both, Vec::<i32>::new(), "沒有交集時應該是空的");
    assert_eq!(only_a, vec![7, 9], "重複的 7 只能出現一次");
}
