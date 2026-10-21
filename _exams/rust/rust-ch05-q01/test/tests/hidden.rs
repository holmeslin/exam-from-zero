use rust_ch05_q01::Pair;

#[test]
fn hidden_pair_of_i32() {
    let p = Pair::new(1, 2);
    assert_eq!(*p.first(), 1, "Pair::new(1, 2).first() 應該是 1");
    assert_eq!(p.swap(), Pair { first: 2, second: 1 }, "swap 後兩個欄位要對調");
}

#[test]
fn hidden_pair_of_str() {
    let p = Pair::new("左", "右");
    assert_eq!(*p.first(), "左", "Pair::new(\"左\", \"右\").first() 應該是 \"左\"");
    assert_eq!(p.swap(), Pair { first: "右", second: "左" }, "swap 後兩個欄位要對調");
}

#[test]
fn hidden_pair_of_string() {
    let p = Pair::new(String::from("a"), String::from("b"));
    let s = p.swap();
    assert_eq!(s.first, "b", "Pair<String> 也要能 swap");
    assert_eq!(s.second, "a", "Pair<String> 也要能 swap");
}
