use rust_ch04_q04::{shift, Point};

#[test]
fn hidden_point_is_copy() {
    let p = Point { x: 1, y: 2 };
    let q = p; // Point 是 Copy 的話，p 還能用
    let moved = shift(p, 10, 20); // 傳進函式後 p 也還能用
    assert_eq!((p.x, p.y), (1, 2), "p 不應該被改變");
    assert_eq!((q.x, q.y), (1, 2), "q 應該是 p 的複製");
    assert_eq!((moved.x, moved.y), (11, 22), "shift(p, 10, 20) 應該得到 (11, 22)");
}
