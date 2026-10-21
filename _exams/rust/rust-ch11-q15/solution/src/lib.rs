use std::panic::{catch_unwind, AssertUnwindSafe};

/// 對 data 執行 f。f 正常結束就回傳 true；
/// f 如果 panic，要把 data 恢復成呼叫前的內容，並回傳 false。
pub fn try_update<F: FnOnce(&mut Vec<i32>)>(data: &mut Vec<i32>, f: F) -> bool {
    let backup = data.clone();
    let result = catch_unwind(AssertUnwindSafe(|| f(data)));
    if result.is_err() {
        *data = backup;
        return false;
    }
    true
}
