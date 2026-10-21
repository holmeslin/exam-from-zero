use rust_ch10_q01::{make_shape, total_area, Rect, Shape, Square};

#[test]
fn hidden_make_shape() {
    assert_eq!(make_shape("square", 3, 99).area(), 9, "make_shape(\"square\", 3, 99) 應該是邊長 3 的正方形");
    assert_eq!(make_shape("rect", 2, 5).area(), 10, "make_shape(\"rect\", 2, 5) 應該是 2x5 的長方形");
}

#[test]
fn hidden_total_area() {
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Square { side: 2 }),
        Box::new(Rect { w: 3, h: 4 }),
        make_shape("square", 5, 0),
    ];
    assert_eq!(total_area(&shapes), 4 + 12 + 25, "面積總和不對");
    assert_eq!(total_area(&[]), 0, "空的 slice 總和應該是 0");
}
