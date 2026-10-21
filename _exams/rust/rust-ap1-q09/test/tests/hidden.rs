use rust_ap1_q09::len_and_keep;

#[test]
fn check_len_and_keep() {
    assert_eq!(len_and_keep(Some(String::from("hello"))), (5, Some(String::from("hello"))), "長度 5，而且 data 要原封不動還回來");
    assert_eq!(len_and_keep(None), (0, None), "None 的長度是 0");
    assert_eq!(len_and_keep(Some(String::new())), (0, Some(String::new())), "空字串長度是 0");
}
