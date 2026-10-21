pub struct Logger {
    lines: Vec<String>,
}

impl Logger {
    pub fn new() -> Logger {
        Logger { lines: Vec::new() }
    }

    // 回傳另一個 Logger，它和 self 共用同一份紀錄
    pub fn share(&self) -> Logger {
        todo!()
    }

    // 只有 &self，也要能新增一行紀錄
    pub fn log(&self, msg: &str) {
        todo!()
    }

    // 回傳目前所有紀錄的複本
    pub fn lines(&self) -> Vec<String> {
        self.lines.clone()
    }
}
