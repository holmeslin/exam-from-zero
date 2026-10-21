use rust_ch10_q17::c_abs;

// 模擬 C 那一邊：用名字 rust_ch10_triple 找到你的函式
unsafe extern "C" {
    fn rust_ch10_triple(x: i32) -> i32;
}

#[test]
fn hidden_c_abs() {
    assert_eq!(c_abs(-5), 5, "c_abs(-5)");
    assert_eq!(c_abs(7), 7, "c_abs(7)");
    assert_eq!(c_abs(0), 0, "c_abs(0)");
}

#[test]
fn hidden_called_from_c() {
    assert_eq!(unsafe { rust_ch10_triple(7) }, 21, "透過 C ABI 呼叫 rust_ch10_triple(7)");
}
