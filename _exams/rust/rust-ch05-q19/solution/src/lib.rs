pub struct Words<'a> {
    text: &'a str,
}

impl<'a> Words<'a> {
    pub fn new(text: &'a str) -> Words<'a> {
        Words { text }
    }

    // 回傳 &'a str 而不是 &str：結果借用的是原本的文字，不是 Words 本身
    pub fn first(&self) -> &'a str {
        match self.text.find(' ') {
            Some(i) => &self.text[..i],
            None => self.text,
        }
    }
}
