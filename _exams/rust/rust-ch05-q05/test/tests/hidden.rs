use rust_ch05_q05::{add_all, first_doubled};

#[test]
fn hidden_add_all_ok() {
    assert_eq!(add_all("1", "2", "3"), Ok(6), "1 + 2 + 3 應該是 Ok(6)");
    assert_eq!(add_all(" 10", "-4 ", "0"), Ok(6), "前後空白要能處理（parse_num 已經 trim）");
}

#[test]
fn hidden_add_all_first_error_wins() {
    assert_eq!(
        add_all("1", "x", "y"),
        Err(String::from("'x' 不是整數")),
        "要回傳第一個失敗的錯誤，也就是 'x' 的那個"
    );
    assert_eq!(add_all("a", "2", "3"), Err(String::from("'a' 不是整數")), "第一個就失敗");
}

#[test]
fn hidden_first_doubled() {
    assert_eq!(first_doubled(&[4, 5, 6]), Some(8), "第一個元素 4 的兩倍是 8");
    assert_eq!(first_doubled(&[]), None, "空切片要回傳 None");
}
