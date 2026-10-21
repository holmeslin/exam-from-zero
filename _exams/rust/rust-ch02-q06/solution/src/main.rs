fn buy_ticket(money: i32, price: i32) -> (i32, i32) {
    let count = money / price;
    let change = money % price;

    (count, change)
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

    let result = buy_ticket(money, price);

    println!("可以買 {} 張，剩下 {} 元", result.0, result.1);
}
