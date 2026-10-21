use std::cell::RefCell;
use std::rc::{Rc, Weak};

pub struct Node {
    pub value: i32,
    pub next: Option<Rc<RefCell<Node>>>,
    pub prev: Option<Weak<RefCell<Node>>>,
}

pub fn new_node(value: i32) -> Rc<RefCell<Node>> {
    Rc::new(RefCell::new(Node { value, next: None, prev: None }))
}

/// 把 b 接在 a 後面：a 的 next 指向 b，b 的 prev 指回 a（不可以形成 strong count 的迴圈）
pub fn link(a: &Rc<RefCell<Node>>, b: &Rc<RefCell<Node>>) {
    a.borrow_mut().next = Some(b.clone());
    b.borrow_mut().prev = Some(Rc::downgrade(a));
}

/// 回傳前一個節點的值；沒有前一個節點，或前一個節點已經被釋放時回傳 None
pub fn prev_value(node: &Rc<RefCell<Node>>) -> Option<i32> {
    let prev = node.borrow().prev.as_ref().and_then(|w| w.upgrade());
    prev.map(|p| p.borrow().value)
}
