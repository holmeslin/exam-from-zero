fn calculate_total(price: i32, count: i32) -> i32 {
    // 回傳 price * count
    0
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

    let total = calculate_total(price, count);

    println!("總價是 {} 元", total);
}
