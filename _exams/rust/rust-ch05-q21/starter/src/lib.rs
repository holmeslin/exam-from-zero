pub trait Container {
    type Item;

    fn get(&self, index: usize) -> Option<&Self::Item>;
    fn size(&self) -> usize;

    // 預設實作：回傳第一個元素（用 get）
    fn first(&self) -> Option<&Self::Item> {
        todo!()
    }
}

pub struct Scores {
    pub data: Vec<i32>,
}

impl Container for Scores {
    type Item = i32;

    fn get(&self, index: usize) -> Option<&i32> {
        todo!()
    }

    fn size(&self) -> usize {
        todo!()
    }
}

// 對任何 Item 是 i32 的 Container，把所有元素加總
// TODO：幫 C 加上 trait bound
pub fn total<C>(c: &C) -> i32 {
    todo!()
}
