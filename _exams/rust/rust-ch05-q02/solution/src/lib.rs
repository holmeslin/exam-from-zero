#[derive(Debug, PartialEq)]
pub enum Either<L, R> {
    Left(L),
    Right(R),
}

impl<L, R> Either<L, R> {
    pub fn is_left(&self) -> bool {
        match self {
            Either::Left(_) => true,
            Either::Right(_) => false,
        }
    }

    pub fn left(self) -> Option<L> {
        match self {
            Either::Left(v) => Some(v),
            Either::Right(_) => None,
        }
    }

    pub fn flip(self) -> Either<R, L> {
        match self {
            Either::Left(v) => Either::Right(v),
            Either::Right(v) => Either::Left(v),
        }
    }
}
