use rust_ch05_q15::Logger;

#[test]
fn hidden_single_logger() {
    let a = Logger::new();
    a.log("one");
    a.log("two");
    assert_eq!(a.lines(), vec!["one", "two"], "依序記錄兩行");
}

#[test]
fn hidden_shared_logger() {
    let a = Logger::new();
    let b = a.share();
    a.log("from a");
    b.log("from b");
    let c = b.share();
    c.log("from c");
    let expected = vec!["from a", "from b", "from c"];
    assert_eq!(a.lines(), expected, "a 要看得到 b、c 寫的紀錄");
    assert_eq!(b.lines(), expected, "b 要看得到 a、c 寫的紀錄");
    drop(a);
    assert_eq!(c.lines(), expected, "a 被丟棄後，其他 Logger 的紀錄還在");
}
