use rust_ch11_q01::total_chars;

#[test]
fn hidden_str_slices() {
    assert_eq!(total_chars(&["ab", "cde"]), 5, "[\"ab\", \"cde\"] 共 5 個字元");
    assert_eq!(total_chars(&["你好", "!"]), 3, "中文一個字算一個字元，不是 3 個 byte");
}

#[test]
fn hidden_strings_and_empty() {
    let owned = vec![String::from("Rust"), String::from("程式")];
    assert_eq!(total_chars(&owned), 6, "傳入 Vec<String> 也要能計算");
    let empty: [&str; 0] = [];
    assert_eq!(total_chars(&empty), 0, "空切片應該回傳 0");
}
