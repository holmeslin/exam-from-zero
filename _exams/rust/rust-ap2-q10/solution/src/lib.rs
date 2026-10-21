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
    type Item<'a> = &'a mut [i32]
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        if self.position >= self.data.len() {
            return None;
        }
        let start = self.position;
        let end = (start + self.size).min(self.data.len());
        self.position = end;
        Some(&mut self.data[start..end])
    }
}
