use rust_ch05_q07::Pair;

#[test]
fn hidden_to_tuple_with_string() {
    let p = Pair { first: String::from("a"), second: String::from("b") };
    let t = p.to_tuple();
    assert_eq!(t, (String::from("a"), String::from("b")), "to_tuple 要回傳兩個欄位的 clone");
    assert_eq!(p.first, "a", "to_tuple 之後 p 還要能用");
}

#[test]
fn hidden_larger() {
    assert_eq!(Pair { first: 3, second: 9 }.larger(), 9, "3 和 9 較大的是 9");
    assert_eq!(Pair { first: 2.5, second: 1.0 }.larger(), 2.5, "f64 也要能用");
    assert_eq!(Pair { first: 'z', second: 'a' }.larger(), 'z', "char 也要能用");
}
