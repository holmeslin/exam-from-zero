use std::sync::RwLock;

pub struct Registry {
    names: RwLock<Vec<String>>,
}

impl Registry {
    pub fn new() -> Self {
        Registry { names: RwLock::new(Vec::new()) }
    }

    /// name 還沒登記過就加入並回傳 true；已經有了就回傳 false
    pub fn add(&self, name: &str) -> bool {
        let mut names = self.names.write().expect("寫鎖失敗");
        if names.iter().any(|n| n == name) {
            return false;
        }
        names.push(name.to_string());
        true
    }

    pub fn contains(&self, name: &str) -> bool {
        self.names.read().expect("讀鎖失敗").iter().any(|n| n == name)
    }

    pub fn len(&self) -> usize {
        self.names.read().expect("讀鎖失敗").len()
    }
}
