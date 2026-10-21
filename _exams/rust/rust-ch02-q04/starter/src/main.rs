fn print_total(price: i32, count: i32) {
    // 印出「總價是 X 元」
}

fn main() {
    println!("請輸入單價：");

    let mut price_input = String::new();
    std::io::stdin().read_line(&mut price_input).expect("讀取失敗");
    let price = price_input.trim().parse::<i32>().expect("不是數字");

    println!("請輸入數量：");

    let mut count_input = String::new();
    std::io::stdin().read_line(&mut count_input).expect("讀取失敗");
    let count = count_input.trim().parse::<i32>().expect("不是數字");

    // 呼叫 print_total
}
