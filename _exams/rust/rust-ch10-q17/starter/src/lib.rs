// TODO：用 unsafe extern "C" 區塊宣告 C 標準函式庫的 abs，並標記成 safe

pub fn c_abs(x: i32) -> i32 {
    todo!()
}

// TODO：讓 C 可以用 rust_ch10_triple 這個名字、照 C ABI 呼叫這個函式
pub fn rust_ch10_triple(x: i32) -> i32 {
    x * 3
}
