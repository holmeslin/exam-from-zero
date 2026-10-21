use rust_ch05_q08::Point;

#[test]
fn hidden_display() {
    let p = Point { x: 3, y: -1 };
    assert_eq!(format!("{}", p), "(3, -1)", "用 {{}} 印出 Point {{ x: 3, y: -1 }} 應該是 (3, -1)");
}

#[test]
fn hidden_to_string() {
    let p = Point { x: 0, y: 42 };
    assert_eq!(p.to_string(), "(0, 42)", "實作 Display 之後就有 .to_string()");
}
