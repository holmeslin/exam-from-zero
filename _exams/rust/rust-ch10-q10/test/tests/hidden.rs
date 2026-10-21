use rust_ch10_q10::{code, from_big, from_code, Level};

#[test]
fn hidden_discriminants() {
    assert_eq!(Level::Low as u8, 1, "Level::Low as u8");
    assert_eq!(code(Level::Medium), 2, "code(Level::Medium)");
    assert_eq!(code(Level::High), 3, "code(Level::High)");
    assert_eq!(code(Level::Critical), 10, "code(Level::Critical)");
    assert_eq!(code(Level::Emergency), 11, "code(Level::Emergency)");
}

#[test]
fn hidden_from_code() {
    assert_eq!(from_code(10), Some(Level::Critical), "from_code(10)");
    assert_eq!(from_code(11), Some(Level::Emergency), "from_code(11)");
    assert_eq!(from_code(0), None, "from_code(0)");
    assert_eq!(from_code(4), None, "from_code(4)");
}

#[test]
fn hidden_from_big() {
    assert_eq!(from_big(3), Some(Level::High), "from_big(3)");
    assert_eq!(from_big(267), None, "from_big(267) 超出 u8，不能用 as 截斷成 11");
    assert_eq!(from_big(4_294_967_041), None, "from_big(4294967041) 超出 u8");
}
