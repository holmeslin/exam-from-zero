pub trait Container {
    type Item;

    fn get(&self, index: usize) -> Option<&Self::Item>;
    fn size(&self) -> usize;

    fn first(&self) -> Option<&Self::Item> {
        self.get(0)
    }
}

pub struct Scores {
    pub data: Vec<i32>,
}

impl Container for Scores {
    type Item = i32;

    fn get(&self, index: usize) -> Option<&i32> {
        self.data.get(index)
    }

    fn size(&self) -> usize {
        self.data.len()
    }
}

pub fn total<C: Container<Item = i32>>(c: &C) -> i32 {
    let mut sum = 0;
    for i in 0..c.size() {
        if let Some(n) = c.get(i) {
            sum += *n;
        }
    }
    sum
}
