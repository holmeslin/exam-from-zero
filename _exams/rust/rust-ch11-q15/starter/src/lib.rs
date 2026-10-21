use std::panic::{catch_unwind, AssertUnwindSafe};

/// 對 data 執行 f。f 正常結束就回傳 true；
/// f 如果 panic，要把 data 恢復成呼叫前的內容，並回傳 false。
pub fn try_update<F: FnOnce(&mut Vec<i32>)>(data: &mut Vec<i32>, f: F) -> bool {
    // TODO：f panic 時會讓整個呼叫者跟著 panic，而且 data 可能只改到一半
    f(data);
    true
}
