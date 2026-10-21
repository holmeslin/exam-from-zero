use rust_ch06_q05::make_labeler;

#[test]
fn hidden_make_labeler() {
    let label = make_labeler(String::from("A"));
    assert_eq!(label(1), "A-1", "make_labeler(\"A\") 的閉包傳入 1 應該得到 \"A-1\"");
    assert_eq!(label(42), "A-42", "同一個閉包要能呼叫第二次");

    let room = make_labeler(String::from("Room"));
    assert_eq!(room(7), "Room-7", "make_labeler(\"Room\") 的閉包傳入 7 應該得到 \"Room-7\"");
}
