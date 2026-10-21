use rust_ap1_q14::bracket;

#[test]
fn check_bracket() {
    assert_eq!(bracket(&42), "[42]", "T = i32");
    assert_eq!(bracket(&String::from("world")), "[world]", "T = String");
    assert_eq!(bracket("hello"), "[hello]", "T = str（DST），需要 ?Sized 才能編譯");
    let s = String::from("Rust 程式");
    assert_eq!(bracket(&s[0..4]), "[Rust]", "T = str，來自 String 的切片");
}
