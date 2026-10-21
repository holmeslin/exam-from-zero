use rust_ap1_q11::sum_if_positive;

#[test]
fn check_sum_if_positive() {
    assert_eq!(sum_if_positive(Some(3), Some(4)), Some(7), "3 和 4 都大於 0");
    assert_eq!(sum_if_positive(Some(3), Some(-4)), None, "b 是負數要回傳 None");
    assert_eq!(sum_if_positive(Some(3), Some(0)), None, "b 是 0 不算大於 0");
    assert_eq!(sum_if_positive(Some(-3), Some(4)), None, "a 是負數要回傳 None");
    assert_eq!(sum_if_positive(None, Some(4)), None, "a 是 None 要回傳 None");
    assert_eq!(sum_if_positive(Some(3), None), None, "b 是 None 要回傳 None");
}
