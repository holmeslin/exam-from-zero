use rust_ch01_q01::is_adult;

#[test]
fn boundary() {
    assert!(is_adult(18));
    assert!(is_adult(30));
    assert!(!is_adult(17));
    assert!(!is_adult(0));
}
