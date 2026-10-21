use rust_ch11_q11::number_lines;

#[test]
fn hidden_number_lines() {
    let mut out: Vec<u8> = Vec::new();
    let n = number_lines("alpha\n\n   \n  beta  \ngamma".as_bytes(), &mut out).expect("不應該回傳錯誤");
    assert_eq!(String::from_utf8(out).unwrap(), "1: alpha\n2: beta\n3: gamma\n", "輸出內容不對");
    assert_eq!(n, 3, "應該回傳寫了 3 行");
}

#[test]
fn hidden_number_lines_empty() {
    let mut out: Vec<u8> = Vec::new();
    let n = number_lines("".as_bytes(), &mut out).expect("不應該回傳錯誤");
    assert_eq!(n, 0, "空輸入應該回傳 0");
    assert!(out.is_empty(), "空輸入不應該寫出任何東西");
}
