use rust_ch04_q05::{perimeter, Rect};

#[test]
fn hidden_perimeter_borrows() {
    let r = Rect { width: 3, height: 4 };
    assert_eq!(perimeter(&r), 14, "3 x 4 的周長應該是 14");
    assert_eq!(perimeter(&r), 14, "可以借很多次");
    assert_eq!(r.width + r.height, 7, "呼叫後 r 應該還能用");
}
