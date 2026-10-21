use rust_ch10_q13::{strings, sum};

#[test]
fn hidden_sum() {
    assert_eq!(sum!(), 0, "sum!()");
    assert_eq!(sum!(5), 5, "sum!(5)");
    assert_eq!(sum!(1, 2, 3), 6, "sum!(1, 2, 3)");
    assert_eq!(sum!(2 * 3, 10 - 6), 10, "sum!(2 * 3, 10 - 6)");
}

#[test]
fn hidden_strings() {
    let v: Vec<String> = strings!["a", "bc"];
    assert_eq!(v, vec![String::from("a"), String::from("bc")], "strings![\"a\", \"bc\"]");
    let empty: Vec<String> = strings![];
    assert!(empty.is_empty(), "strings![] 應該是空的 Vec<String>");
}
