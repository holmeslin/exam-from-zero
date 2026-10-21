fn main() {
    println!("請輸入你最喜歡的食物：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    println!("你喜歡 {}！", input.trim());
}
