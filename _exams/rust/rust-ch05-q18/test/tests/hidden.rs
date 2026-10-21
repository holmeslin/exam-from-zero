use rust_ch05_q18::{first_of, longer};

#[test]
fn hidden_longer() {
    assert_eq!(longer("hello", "hi"), "hello", "hello 比 hi 長");
    assert_eq!(longer("ab", "xyz"), "xyz", "xyz 比 ab 長");
    assert_eq!(longer("same", "size"), "same", "一樣長時回傳 a");
}

#[test]
fn hidden_first_of_outlives_b() {
    let keep = String::from("keep");
    let result;
    {
        let temporary = String::from("temporary");
        result = first_of(&keep, &temporary);
    }
    // temporary 已經被釋放，但 result 只借用 keep，所以還能用
    assert_eq!(result, "keep", "first_of 永遠回傳 a");
}
