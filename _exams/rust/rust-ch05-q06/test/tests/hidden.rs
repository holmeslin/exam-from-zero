use rust_ch05_q06::{Rect, Shape, Square};

struct HiddenTriangle;

impl Shape for HiddenTriangle {
    fn area(&self) -> f64 {
        1.26
    }
}

#[test]
fn hidden_rect_uses_default() {
    let r = Rect { w: 3.0, h: 2.5 };
    assert_eq!(r.area(), 7.5, "3.0 x 2.5 的面積是 7.5");
    assert_eq!(r.describe(), "面積 7.5", "Rect 用預設的 describe");
}

#[test]
fn hidden_default_for_other_types() {
    assert_eq!(HiddenTriangle.describe(), "面積 1.3", "預設 describe 要取到小數點後一位（1.26 印成 1.3）");
}

#[test]
fn hidden_square_overrides() {
    let s = Square { side: 2.0 };
    assert_eq!(s.area(), 4.0, "邊長 2 的正方形面積是 4");
    assert_eq!(s.describe(), "正方形，邊長 2.0", "Square 要覆寫 describe");
}
