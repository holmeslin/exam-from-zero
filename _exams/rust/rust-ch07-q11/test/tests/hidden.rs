use rust_ch07_q11::gcd;

#[test]
fn hidden_gcd_values() {
    assert_eq!(gcd(12, 8), 4, "gcd(12, 8) 應該是 4（gcd 本身不需要改）");
    assert_eq!(gcd(7, 3), 1, "gcd(7, 3) 應該是 1");
}

#[test]
fn hidden_doc_example_kept() {
    let src = include_str!("../src/lib.rs");
    assert!(
        src.lines().any(|l| l.trim_start().starts_with("///") && l.contains("use rust_ch07_q11::gcd")),
        "請保留 # Examples 裡的範例並把它修好，不要直接刪掉；範例裡要有 use rust_ch07_q11::gcd;"
    );
}
