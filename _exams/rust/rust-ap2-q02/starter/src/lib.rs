pub struct FormatterLike<'buffer> {
    pub output: &'buffer mut String,
}

// 目前無法編譯：只用一個生命週期，把外層借用和內層 String 的借用綁成一樣長。
// 請修改 Builder 的生命週期設計，不要修改 write_two_parts 的內容。
pub struct Builder<'a> {
    formatter: &'a mut FormatterLike<'a>,
}

impl<'a> Builder<'a> {
    pub fn new(formatter: &'a mut FormatterLike<'a>) -> Self {
        Builder { formatter }
    }

    pub fn field(&mut self, text: &str) {
        self.formatter.output.push_str(text);
    }
}

pub fn write_two_parts(formatter: &mut FormatterLike<'_>) {
    let mut first = Builder::new(formatter);
    first.field("第一段");

    formatter.output.push(' ');

    let mut second = Builder::new(formatter);
    second.field("第二段");
}
