unsafe extern "C" {
    safe fn abs(x: i32) -> i32;
}

pub fn c_abs(x: i32) -> i32 {
    abs(x)
}

#[unsafe(no_mangle)]
pub extern "C" fn rust_ch10_triple(x: i32) -> i32 {
    x * 3
}
