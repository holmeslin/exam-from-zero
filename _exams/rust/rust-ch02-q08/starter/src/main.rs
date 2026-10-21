fn is_power_of_two(n: i32) -> bool {
    // 用遞迴判斷 n 是不是 2 的次方
    false
}

fn main() {
    println!("請輸入數字：");

    let mut n_input = String::new();
    std::io::stdin().read_line(&mut n_input).expect("讀取失敗");
    let n = n_input.trim().parse::<i32>().expect("不是數字");

    if is_power_of_two(n) {
        println!("是 2 的次方");
    } else {
        println!("不是 2 的次方");
    }
}
