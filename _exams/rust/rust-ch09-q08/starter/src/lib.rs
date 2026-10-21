use std::sync::RwLock;

pub struct Registry {
    names: RwLock<Vec<String>>,
}

impl Registry {
    pub fn new() -> Self {
        todo!()
    }

    /// name 還沒登記過就加入並回傳 true；已經有了就回傳 false
    pub fn add(&self, name: &str) -> bool {
        todo!()
    }

    pub fn contains(&self, name: &str) -> bool {
        todo!()
    }

    pub fn len(&self) -> usize {
        todo!()
    }
}
