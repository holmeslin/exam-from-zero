fn main() {
    println!("請輸入年齡：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let age = input.trim().parse::<i32>().expect("不是數字");

    let ticket_price = if age < 18 { 50 } else { 100 };

    println!("票價是 {} 元", ticket_price);
}
