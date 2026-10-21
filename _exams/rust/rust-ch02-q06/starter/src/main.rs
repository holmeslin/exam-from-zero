fn buy_ticket(money: i32, price: i32) -> (i32, i32) {
    // 回傳 (可以買幾張, 剩下多少錢)
    (0, 0)
}

fn main() {
    println!("請輸入你有多少錢：");

    let mut money_input = String::new();
    std::io::stdin().read_line(&mut money_input).expect("讀取失敗");
    let money = money_input.trim().parse::<i32>().expect("不是數字");

    println!("請輸入票價：");

    let mut price_input = String::new();
    std::io::stdin().read_line(&mut price_input).expect("讀取失敗");
    let price = price_input.trim().parse::<i32>().expect("不是數字");

    // 呼叫 buy_ticket，印出「可以買 X 張，剩下 Y 元」
}
