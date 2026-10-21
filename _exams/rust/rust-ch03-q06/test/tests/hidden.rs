use rust_ch03_q06::{area, Shape};

#[test]
fn hidden_shape_area() {
    assert_eq!(area(Shape::Rectangle(3, 4)), 12, "Rectangle(3, 4) 的面積應該是 12");
    assert_eq!(area(Shape::Square(5)), 25, "Square(5) 的面積應該是 25");
    assert_eq!(area(Shape::Triangle(6, 4)), 12, "Triangle(6, 4) 的面積應該是 12");
    assert_eq!(area(Shape::Triangle(5, 3)), 7, "Triangle(5, 3) 的面積應該是 7（整數除法）");
    assert_eq!(area(Shape::Rectangle(7, 2)), 14, "Rectangle(7, 2) 的面積應該是 14");
}
