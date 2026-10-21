fn main() {
    println!("請輸入年齡：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let age = input.trim().parse::<i32>().expect("不是數字");

    // 改用 if 表達式依 age 決定票價
    let ticket_price = 0;

    println!("票價是 {} 元", ticket_price);
}
