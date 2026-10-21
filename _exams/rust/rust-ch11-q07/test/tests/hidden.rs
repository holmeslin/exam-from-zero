use rust_ch11_q07::elimination_order;

#[test]
fn hidden_classic() {
    assert_eq!(elimination_order(7, 3), vec![3, 6, 2, 7, 5, 1, 4], "n = 7、k = 3 的淘汰順序不對");
    assert_eq!(elimination_order(6, 2), vec![2, 4, 6, 3, 1, 5], "n = 6、k = 2 的淘汰順序不對");
}

#[test]
fn hidden_edges() {
    assert_eq!(elimination_order(4, 1), vec![1, 2, 3, 4], "k = 1 時應該依序淘汰");
    assert_eq!(elimination_order(1, 5), vec![1], "只有一個人時就是他");
    assert_eq!(elimination_order(0, 3), Vec::<usize>::new(), "沒有人時回傳空的 Vec");
}
