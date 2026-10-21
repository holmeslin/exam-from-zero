use rust_ch06_q06::parse_score;

#[test]
fn hidden_parse_score_ok() {
    assert_eq!(parse_score("85"), Ok(85), "\"85\" 應該得到 Ok(85)");
    assert_eq!(parse_score(" 100 "), Ok(100), "前後空白要先 trim 掉，100 也算合法");
    assert_eq!(parse_score("0"), Ok(0), "0 是合法分數");
}

#[test]
fn hidden_parse_score_err() {
    assert_eq!(parse_score("101"), Err(String::from("超出範圍：101")), "大於 100 要回傳 Err(\"超出範圍：101\")");
    assert_eq!(parse_score("abc"), Err(String::from("不是數字：abc")), "無法解析時要回傳 Err(\"不是數字：abc\")");
    assert_eq!(parse_score(" -5 "), Err(String::from("不是數字：-5")), "負數無法解析成 u32，訊息裡放 trim 後的字串");
}
