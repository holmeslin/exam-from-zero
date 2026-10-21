#[derive(Debug, PartialEq)]
pub enum Either<L, R> {
    Left(L),
    Right(R),
}

impl<L, R> Either<L, R> {
    // 是 Left 就回傳 true
    pub fn is_left(&self) -> bool {
        todo!()
    }

    // Left(v) 回傳 Some(v)，Right 回傳 None
    pub fn left(self) -> Option<L> {
        todo!()
    }

    // Left(v) 變成 Right(v)，Right(v) 變成 Left(v)
    pub fn flip(self) -> Either<R, L> {
        todo!()
    }
}
