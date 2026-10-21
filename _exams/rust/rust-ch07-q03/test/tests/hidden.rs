use rust_ch07_q03::shapes::{circle, square};

#[test]
fn hidden_file_mod() {
    assert_eq!(square::area(3.0), 9.0, "shapes::square::area(3.0) 應該是 9.0");
    assert_eq!(square::area(0.5), 0.25, "shapes::square::area(0.5) 應該是 0.25");
    assert!((circle::area(1.0) - std::f64::consts::PI).abs() < 1e-9, "shapes::circle::area(1.0) 應該是 PI");
}
