use rust_ch06_q07::Collatz;

#[test]
fn hidden_collatz_sequence() {
    let got: Vec<u64> = Collatz::new(6).collect();
    assert_eq!(got, vec![6, 3, 10, 5, 16, 8, 4, 2, 1], "從 6 開始的序列不對（要包含起點和最後的 1）");

    let one: Vec<u64> = Collatz::new(1).collect();
    assert_eq!(one, vec![1], "從 1 開始只會產出 1，接著就結束");
}

#[test]
fn hidden_collatz_ends() {
    let mut it = Collatz::new(2);
    assert_eq!(it.next(), Some(2), "第一次 next 回傳起點");
    assert_eq!(it.next(), Some(1), "2 是偶數，下一個是 1");
    assert_eq!(it.next(), None, "產出 1 之後要回傳 None");
    assert_eq!(it.next(), None, "結束之後再呼叫 next 也要一直是 None");

    assert_eq!(Collatz::new(27).count(), 112, "從 27 開始的序列共有 112 個數字");
}
