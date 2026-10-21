use std::error::Error;
use std::num::ParseIntError;
use rust_ch11_q12::{parse_port, PortError};

#[test]
fn hidden_ok() {
    assert_eq!(parse_port("8080").unwrap(), 8080, "8080 是合法埠號");
    assert_eq!(parse_port("  3000 ").unwrap(), 3000, "要先去掉頭尾空白");
}

#[test]
fn hidden_variants_and_display() {
    let e = parse_port("   ").unwrap_err();
    assert!(matches!(e, PortError::Empty), "空字串應該是 Empty，實際是 {:?}", e);
    assert_eq!(e.to_string(), "埠號不能是空的");

    let e = parse_port("80").unwrap_err();
    assert!(matches!(e, PortError::Reserved(80)), "80 應該是 Reserved(80)，實際是 {:?}", e);
    assert_eq!(e.to_string(), "埠號 80 是保留埠");

    let e = parse_port("http").unwrap_err();
    assert!(matches!(e, PortError::NotNumber(_)), "http 應該是 NotNumber，實際是 {:?}", e);
    assert_eq!(e.to_string(), "埠號不是有效的數字");

    let e = parse_port("70000").unwrap_err();
    assert!(matches!(e, PortError::NotNumber(_)), "70000 超出 u16 範圍，應該是 NotNumber，實際是 {:?}", e);
}

#[test]
fn hidden_source_and_from() {
    let e = parse_port("abc").unwrap_err();
    let src = e.source().expect("NotNumber 的 source() 應該回傳底層的 ParseIntError");
    assert!(src.downcast_ref::<ParseIntError>().is_some(), "source() 應該是 ParseIntError");
    assert!(parse_port("").unwrap_err().source().is_none(), "Empty 沒有底層原因，source() 應該是 None");

    let raw = "x".parse::<u16>().unwrap_err();
    assert!(matches!(PortError::from(raw), PortError::NotNumber(_)), "From<ParseIntError> 應該轉成 NotNumber");

    let boxed: Box<dyn Error> = Box::new(PortError::Reserved(22));
    assert_eq!(boxed.to_string(), "埠號 22 是保留埠", "放進 Box<dyn Error> 後 Display 也要正確");
}
