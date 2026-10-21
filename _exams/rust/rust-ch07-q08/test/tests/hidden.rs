use rust_ch07_q08::shapes;
use rust_ch07_q08::{Circle, Rectangle};

#[test]
fn hidden_reexports() {
    let r = Rectangle::new(4.0, 6.0);
    assert_eq!(r.area(), 24.0, "Rectangle::new(4.0, 6.0).area() 應該是 24.0");
    let c = Circle::new(1.0);
    assert!((c.area() - std::f64::consts::PI).abs() < 1e-9, "Circle::new(1.0).area() 應該是 PI");
    let r2 = shapes::Rectangle::new(2.0, 3.0);
    assert_eq!(r2.area(), 6.0, "shapes::Rectangle 也要能用");
    let c2 = shapes::Circle::new(2.0);
    assert_eq!(c2.radius, 2.0, "shapes::Circle 也要能用");
}
