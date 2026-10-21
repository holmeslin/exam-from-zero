use std::cell::RefCell;
use std::rc::Rc;

pub struct Logger {
    lines: Rc<RefCell<Vec<String>>>,
}

impl Logger {
    pub fn new() -> Logger {
        Logger {
            lines: Rc::new(RefCell::new(Vec::new())),
        }
    }

    pub fn share(&self) -> Logger {
        Logger {
            lines: self.lines.clone(),
        }
    }

    pub fn log(&self, msg: &str) {
        self.lines.borrow_mut().push(String::from(msg));
    }

    pub fn lines(&self) -> Vec<String> {
        self.lines.borrow().clone()
    }
}
