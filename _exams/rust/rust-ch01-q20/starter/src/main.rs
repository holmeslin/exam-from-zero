fn main() {
    println!("請輸入目標數字：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let target = input.trim().parse::<i32>().expect("不是數字");

    // 找第一組 a * b >= target，印出後跳出兩層迴圈
}
