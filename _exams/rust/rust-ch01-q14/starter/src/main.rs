fn main() {
    println!("請輸入一個數字：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    // 把 input 轉成數字，印出加 10 的結果
}
