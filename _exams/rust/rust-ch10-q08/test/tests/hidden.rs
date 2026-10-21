use rust_ch10_q08::Vec2;

#[test]
fn hidden_ops() {
    let a = Vec2 { x: 1, y: 2 };
    let b = Vec2 { x: 3, y: 5 };
    assert_eq!(a + b, Vec2 { x: 4, y: 7 }, "a + b");
    assert_eq!(a - b, Vec2 { x: -2, y: -3 }, "a - b");
    assert_eq!(-a, Vec2 { x: -1, y: -2 }, "-a");
    assert_eq!(b * 3, Vec2 { x: 9, y: 15 }, "b * 3");
    let mut c = a;
    c += b;
    c += b;
    assert_eq!(c, Vec2 { x: 7, y: 12 }, "c += b 兩次");
}
