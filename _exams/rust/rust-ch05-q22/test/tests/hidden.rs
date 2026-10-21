use rust_ch05_q22::normalize_tabs;
use std::borrow::Cow;

#[test]
fn hidden_no_tab_borrows() {
    let r = normalize_tabs("hello world");
    assert_eq!(r, "hello world", "沒有 tab 時內容不變");
    assert!(matches!(r, Cow::Borrowed(_)), "沒有 tab 時要回傳 Cow::Borrowed，不要建立新字串");
}

#[test]
fn hidden_tab_owned() {
    let r = normalize_tabs("a\tb\tc");
    assert_eq!(r, "a b c", "每個 tab 都要換成一個空白");
    assert!(matches!(r, Cow::Owned(_)), "有修改時要回傳 Cow::Owned");
}

#[test]
fn hidden_deref_to_str() {
    let r = normalize_tabs("x\ty");
    assert_eq!(r.len(), 3, "Cow<str> 可以直接當 &str 用");
}
