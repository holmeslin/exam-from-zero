pub struct FormatterLike<'buffer> {
    pub output: &'buffer mut String,
}

pub struct Builder<'borrow, 'buffer: 'borrow> {
    formatter: &'borrow mut FormatterLike<'buffer>,
}

impl<'borrow, 'buffer> Builder<'borrow, 'buffer> {
    pub fn new(formatter: &'borrow mut FormatterLike<'buffer>) -> Self {
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
