use rust_ap2_q13::numbered;

#[test]
fn label_can_be_dropped_first() {
    let label = String::from("不會被迭代器使用");
    let numbers = numbered(&label, 3);
    drop(label);
    assert_eq!(numbers.collect::<Vec<_>>(), vec![1, 2, 3], "應該產生 1 到 n");
}
