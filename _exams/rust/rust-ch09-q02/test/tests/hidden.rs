use rust_ch09_q02::spawn_greeting;

#[test]
fn greeting_from_thread() {
    let h = spawn_greeting(String::from("Rust"));
    assert_eq!(h.join().expect("執行緒 panic 了"), "Hello, Rust!", "join 拿到的回傳值不對");
    let h = spawn_greeting(String::from("小明"));
    assert_eq!(h.join().expect("執行緒 panic 了"), "Hello, 小明!", "join 拿到的回傳值不對");
}
