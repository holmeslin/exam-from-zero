pub struct Visits {
    count: u32,
}

impl Visits {
    pub fn new() -> Visits {
        Visits { count: 0 }
    }

    // 注意：這裡只有 &self，不能改成 &mut self
    pub fn visit(&self) {
        todo!()
    }

    pub fn count(&self) -> u32 {
        self.count
    }
}
