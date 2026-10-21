use std::error::Error;
use rust_ch11_q14::{parse_age, AgeError};

#[test]
fn hidden_ok() {
    assert_eq!(parse_age(" 42 ").unwrap(), 42, "要先去掉頭尾空白");
    assert_eq!(parse_age("150").unwrap(), 150, "150 還在範圍內");
}

#[test]
fn hidden_messages() {
    let e = parse_age("").unwrap_err();
    assert!(matches!(e, AgeError::Empty), "空字串應該是 Empty，實際是 {:?}", e);
    assert_eq!(e.to_string(), "年齡不能是空的");

    let e = parse_age("151").unwrap_err();
    assert!(matches!(e, AgeError::TooOld(151)), "151 應該是 TooOld(151)，實際是 {:?}", e);
    assert_eq!(e.to_string(), "年齡 151 太大了");

    let e = parse_age("abc").unwrap_err();
    assert!(matches!(e, AgeError::NotNumber(_)), "abc 應該是 NotNumber，實際是 {:?}", e);
    assert_eq!(e.to_string(), "年齡不是數字");
    assert!(e.source().is_some(), "NotNumber 的 source() 應該回傳底層的 ParseIntError");
}
