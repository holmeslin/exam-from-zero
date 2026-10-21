use rust_ch06_q10::digits_to_number;

#[test]
fn hidden_digits_to_number() {
    assert_eq!(digits_to_number(&[1, 2, 3]), 123, "[1, 2, 3] 應該組成 123");
    assert_eq!(digits_to_number(&[0, 0, 7]), 7, "前導 0 不影響結果：[0, 0, 7] 是 7");
    assert_eq!(digits_to_number(&[]), 0, "空切片回傳初始值 0");
    assert_eq!(
        digits_to_number(&[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]),
        9876543210,
        "10 位數也要正確（會超過 u32，累積值要用 u64）"
    );
}
