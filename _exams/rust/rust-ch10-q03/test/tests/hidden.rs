use rust_ch10_q03::{names, Animal, Cat, Dog};

#[test]
fn hidden_dyn_and_twin() {
    let cat = Cat { name: String::from("小花") };
    let twin = cat.twin();
    assert_eq!(twin.name(), "小花", "Cat 的 twin() 應該複製出同名的貓");

    let zoo: Vec<Box<dyn Animal>> = vec![Box::new(cat), Box::new(Dog), Box::new(twin)];
    assert_eq!(names(&zoo), vec!["小花", "狗狗", "小花"], "names 應該依序回傳每隻動物的 name()");
}
