fn main() {
    println!("請輸入一個正整數：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let n = input.trim().parse::<i32>().expect("不是數字");

    // 用 for 從 1 印到 n
}
