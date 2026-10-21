use rust_ap1_q13::categories;

#[test]
fn check_categories() {
    assert_eq!(categories(), ("哺乳類", "人工智慧"), "第一個要是 Animal 的版本，第二個要是 Robot 的版本");
}
