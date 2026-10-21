use rust_ch07_q07::divide;

#[test]
fn hidden_divide_normal() {
    assert_eq!(divide(10, 2), 5, "divide(10, 2) 應該是 5");
    assert_eq!(divide(-9, 3), -3, "divide(-9, 3) 應該是 -3");
}

#[test]
#[should_panic(expected = "除數不能是 0")]
fn hidden_divide_by_zero_message() {
    divide(1, 0);
}
