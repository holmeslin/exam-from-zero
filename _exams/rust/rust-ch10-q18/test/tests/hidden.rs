use rust_ch10_q18::{fail, must_positive, sum_valid};

#[test]
fn hidden_fail_is_never() {
    // fail 的回傳型別必須是 !
    let _f: fn(&str) -> ! = fail;
}

#[test]
fn hidden_must_positive_ok() {
    assert_eq!(must_positive(5), 5, "must_positive(5)");
}

#[test]
#[should_panic(expected = "必須是正數")]
fn hidden_must_positive_panics() {
    must_positive(0);
}

#[test]
fn hidden_sum_valid() {
    assert_eq!(sum_valid(&["1", "abc", "20", "", "-3"]), 18, "sum_valid 應該跳過不是數字的項目");
    assert_eq!(sum_valid(&[]), 0, "sum_valid 空 slice");
}
