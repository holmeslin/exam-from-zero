use rust_ch04_q07::{add_suffix, make_greeting};

#[test]
fn hidden_greeting_accepts_str_and_string() {
    assert_eq!(make_greeting("小明"), "你好，小明！", "傳字串字面值");
    let owned = String::from("小花");
    assert_eq!(make_greeting(&owned), "你好，小花！", "傳 &String 也要能用");
    assert_eq!(owned, "小花", "owned 應該還在、內容不變");
}

#[test]
fn hidden_add_suffix_modifies_in_place() {
    let mut s = String::from("Rust");
    add_suffix(&mut s, " 好好玩");
    assert_eq!(s, "Rust 好好玩", "s 後面應該接上 suffix");
    add_suffix(&mut s, "！");
    assert_eq!(s, "Rust 好好玩！", "可以接很多次");
}
