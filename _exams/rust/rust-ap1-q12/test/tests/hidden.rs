use rust_ap1_q12::{link, new_node, prev_value};
use std::rc::Rc;

#[test]
fn check_link_counts() {
    let a = new_node(1);
    let b = new_node(2);
    let c = new_node(3);
    link(&a, &b);
    link(&b, &c);

    assert_eq!(Rc::strong_count(&a), 1, "a 只被變數 a 擁有；b.prev 要用 Weak，不能增加 a 的 strong count");
    assert_eq!(Rc::weak_count(&a), 1, "b.prev 指向 a，a 的 weak count 應該是 1");
    assert_eq!(Rc::strong_count(&b), 2, "b 被變數 b 和 a.next 擁有，strong count 應該是 2");
    assert_eq!(Rc::weak_count(&b), 1, "c.prev 指向 b，b 的 weak count 應該是 1");
    assert_eq!(Rc::weak_count(&c), 0, "沒有節點的 prev 指向 c");

    assert_eq!(prev_value(&a), None, "a 沒有前一個節點");
    assert_eq!(prev_value(&b), Some(1), "b 的前一個節點是 a（值 1）");
    assert_eq!(prev_value(&c), Some(2), "c 的前一個節點是 b（值 2）");
}

#[test]
fn check_prev_after_drop() {
    let a = new_node(10);
    let b = new_node(20);
    link(&a, &b);
    let weak_b = Rc::downgrade(&b);
    drop(a);
    assert_eq!(prev_value(&b), None, "a 被釋放之後，b 的 prev upgrade 應該得到 None");
    drop(b);
    assert!(weak_b.upgrade().is_none(), "a、b 都 drop 之後 b 應該被釋放；如果還活著，代表有 strong count 迴圈");
}
