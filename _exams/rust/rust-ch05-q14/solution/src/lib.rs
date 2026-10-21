use std::cell::Cell;

pub struct Visits {
    count: Cell<u32>,
}

impl Visits {
    pub fn new() -> Visits {
        Visits { count: Cell::new(0) }
    }

    pub fn visit(&self) {
        self.count.set(self.count.get() + 1);
    }

    pub fn count(&self) -> u32 {
        self.count.get()
    }
}
