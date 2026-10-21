use rust_ch06_q02::remove_below;

#[test]
fn hidden_remove_below() {
    let mut v = vec![5, 1, 8, 3, 10, 3];
    remove_below(&mut v, 4);
    assert_eq!(v, vec![5, 8, 10], "門檻 4：應該只留下 >= 4 的元素，而且順序不變");

    let mut w = vec![3, 2, 3];
    remove_below(&mut w, 3);
    assert_eq!(w, vec![3, 3], "門檻 3：等於門檻的元素要保留");

    let mut empty: Vec<i32> = Vec::new();
    remove_below(&mut empty, 0);
    assert_eq!(empty, Vec::<i32>::new(), "空的 Vec 處理後仍然是空的");
}
