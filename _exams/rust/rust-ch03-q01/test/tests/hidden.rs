use rust_ch03_q01::{area, is_square, Rectangle};

#[test]
fn hidden_area() {
    assert_eq!(area(Rectangle { width: 3, height: 4 }), 12, "3 x 4 的面積應該是 12");
    assert_eq!(area(Rectangle { width: 10, height: 1 }), 10, "10 x 1 的面積應該是 10");
    assert_eq!(area(Rectangle { width: 0, height: 7 }), 0, "0 x 7 的面積應該是 0");
}

#[test]
fn hidden_is_square() {
    assert!(is_square(Rectangle { width: 5, height: 5 }), "5 x 5 是正方形");
    assert!(!is_square(Rectangle { width: 5, height: 6 }), "5 x 6 不是正方形");
}
