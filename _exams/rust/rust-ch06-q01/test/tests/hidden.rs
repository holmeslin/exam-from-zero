use rust_ch06_q01::apply_twice;

fn plus_three(x: i32) -> i32 {
    x + 3
}

fn triple(x: i32) -> i32 {
    x * 3
}

#[test]
fn hidden_apply_twice() {
    assert_eq!(apply_twice(plus_three, 10), 16, "apply_twice(plus_three, 10) 應該是 (10 + 3) + 3 = 16");
    assert_eq!(apply_twice(triple, 2), 18, "apply_twice(triple, 2) 應該是 (2 * 3) * 3 = 18");
    assert_eq!(apply_twice(triple, 0), 0, "apply_twice(triple, 0) 應該是 0");
}
