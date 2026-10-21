use rust_ch10_q05::{Hexagon, Polygon, Square, Triangle};

#[test]
fn hidden_consts() {
    assert_eq!(Triangle::SIDES, 3, "Triangle::SIDES");
    assert_eq!(Square::SIDES, 4, "Square::SIDES");
    assert_eq!(Hexagon::SIDES, 6, "Hexagon::SIDES");
    assert_eq!(Triangle::NAME, "三角形", "Triangle::NAME");
    assert_eq!(Square::NAME, "正方形", "Square::NAME");
    assert_eq!(Hexagon::NAME, "多邊形", "Hexagon 應該沿用 NAME 的預設值");
}

#[test]
fn hidden_angle_sum() {
    assert_eq!(Triangle::angle_sum(), 180, "三角形內角和");
    assert_eq!(Square::angle_sum(), 360, "正方形內角和");
    assert_eq!(Hexagon::angle_sum(), 720, "六邊形內角和");
}
