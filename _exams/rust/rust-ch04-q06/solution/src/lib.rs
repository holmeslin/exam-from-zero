pub struct Counter {
    pub count: i32,
}

impl Counter {
    pub fn new() -> Self {
        Counter { count: 0 }
    }

    // 只讀取目前的計數
    pub fn get(&self) -> i32 {
        self.count
    }

    // 把計數加 1
    pub fn increment(&mut self) {
        self.count += 1;
    }

    // 結束計數器，回傳最終計數；呼叫後計數器就不能再用
    pub fn finish(self) -> i32 {
        self.count
    }
}
