use rust_ch04_q06::Counter;

#[test]
fn hidden_counter_self_kinds() {
    let mut c = Counter::new();
    assert_eq!(c.get(), 0, "一開始計數應該是 0");
    c.increment();
    c.increment();
    assert_eq!(c.get(), 2, "加兩次之後應該是 2");
    c.increment();
    assert_eq!(c.finish(), 3, "finish 應該回傳最終計數 3");
}
