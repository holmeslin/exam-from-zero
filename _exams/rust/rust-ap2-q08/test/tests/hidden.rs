use rust_ap2_q08::{Article, Id, User};

#[test]
fn typed_ids() {
    let user_id = Id::<User>::new(7);
    let article_id = Id::<Article>::new(42);
    assert_eq!(user_id.value(), 7, "Id::<User>::new(7).value() 應該是 7");
    assert_eq!(article_id.value(), 42, "Id::<Article>::new(42).value() 應該是 42");
    assert_eq!(
        std::mem::size_of::<Id<User>>(),
        std::mem::size_of::<u64>(),
        "型別標記不該佔空間，Id<T> 的大小應該和 u64 一樣"
    );
}
