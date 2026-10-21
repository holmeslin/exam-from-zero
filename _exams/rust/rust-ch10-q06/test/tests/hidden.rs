use rust_ch10_q06::{add_arrays, filled, reversed};

#[test]
fn hidden_add_arrays() {
    assert_eq!(add_arrays([1, 2, 3], [10, 20, 30]), [11, 22, 33], "add_arrays 長度 3");
    assert_eq!(add_arrays([5], [-5]), [0], "add_arrays 長度 1");
}

#[test]
fn hidden_reversed() {
    assert_eq!(reversed([1, 2, 3, 4]), [4, 3, 2, 1], "reversed 長度 4");
    assert_eq!(reversed([7]), [7], "reversed 長度 1");
    let empty: [i32; 0] = [];
    assert_eq!(reversed(empty), empty, "reversed 空陣列");
}

#[test]
fn hidden_filled() {
    let a: [i32; 4] = filled(9);
    assert_eq!(a, [9, 9, 9, 9], "filled::<i32, 4>(9)");
    let b: [&str; 2] = filled("hi");
    assert_eq!(b, ["hi", "hi"], "filled::<&str, 2>(\"hi\")");
    assert_eq!(filled::<u8, { 2 + 1 }>(7), [7, 7, 7], "filled::<u8, {{ 2 + 1 }}>(7)");
}
