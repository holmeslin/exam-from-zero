// 已經寫好的輔助函式：把字串轉成 i32，失敗時錯誤訊息已經轉成 String
pub fn parse_num(s: &str) -> Result<i32, String> {
    match s.trim().parse::<i32>() {
        Ok(n) => Ok(n),
        Err(_) => Err(format!("'{}' 不是整數", s)),
    }
}

// 把三個字串轉成整數後相加；任何一個失敗就回傳那個錯誤
pub fn add_all(a: &str, b: &str, c: &str) -> Result<i32, String> {
    todo!()
}

// 回傳第一個元素的兩倍；切片是空的就回傳 None
pub fn first_doubled(numbers: &[i32]) -> Option<i32> {
    todo!()
}
