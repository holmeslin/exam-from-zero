// 這份起始程式碼目前無法編譯：struct 裡的參考缺少生命週期標注

pub struct Words {
    text: &str,
}

impl Words {
    pub fn new(text: &str) -> Words {
        Words { text }
    }

    // 回傳第一個空白之前的那段文字；沒有空白就回傳整段
    pub fn first(&self) -> &str {
        todo!()
    }
}
