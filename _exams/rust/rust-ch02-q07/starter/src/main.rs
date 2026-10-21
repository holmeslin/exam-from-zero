fn discount_price(price: i32, is_member: bool) -> i32 {
    // 價格 <= 0 時提前 return 0;
    // 會員打 8 折，非會員原價
    price
}

fn main() {
    println!("請輸入價格：");

    let mut price_input = String::new();
    std::io::stdin().read_line(&mut price_input).expect("讀取失敗");
    let price = price_input.trim().parse::<i32>().expect("不是數字");

    let is_member = true;
    let final_price = discount_price(price, is_member);

    println!("折扣後價格是 {} 元", final_price);
}
