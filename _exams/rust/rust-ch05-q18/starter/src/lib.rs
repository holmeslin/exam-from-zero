// 這份起始程式碼目前無法編譯：回傳參考的函式缺少生命週期標注

// 回傳比較長的那個；一樣長就回傳 a
pub fn longer(a: &str, b: &str) -> &str {
    if a.len() >= b.len() { a } else { b }
}

// 永遠回傳 a；回傳值只和 a 有關，和 b 無關
pub fn first_of(a: &str, _b: &str) -> &str {
    a
}
