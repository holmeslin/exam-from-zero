pub trait LendingIterator {
    type Item<'a>
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}

pub struct ChunksMut {
    data: Vec<i32>,
    size: usize,
    position: usize,
}

impl ChunksMut {
    pub fn new(data: Vec<i32>, size: usize) -> Self {
        ChunksMut { data, size, position: 0 }
    }

    pub fn into_inner(self) -> Vec<i32> {
        self.data
    }
}

impl LendingIterator for ChunksMut {
    // TODO: Item<'a> 應該是借用自 self.data 的可變 slice
    type Item<'a> = ()
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        let _ = (self.size, self.position);
        None
    }
}
