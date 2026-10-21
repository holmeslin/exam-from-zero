use std::marker::PhantomData;

pub struct User;
pub struct Article;

pub struct Id<T> {
    value: u64,
    _kind: PhantomData<T>,
}

impl<T> Id<T> {
    pub fn new(value: u64) -> Self {
        Id {
            value,
            _kind: PhantomData,
        }
    }

    pub fn value(&self) -> u64 {
        self.value
    }
}
