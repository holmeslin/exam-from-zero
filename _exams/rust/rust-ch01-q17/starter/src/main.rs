fn main() {
    println!("請輸入目標金額：");

    let mut goal_input = String::new();
    std::io::stdin().read_line(&mut goal_input).expect("讀取失敗");

    let goal = goal_input.trim().parse::<i32>().expect("不是數字");

    println!("請輸入目前金額：");

    let mut money_input = String::new();
    std::io::stdin().read_line(&mut money_input).expect("讀取失敗");

    let money = money_input.trim().parse::<i32>().expect("不是數字");

    // 用 while 每輪多存 30 元，並印出目前金額

    println!("達標！");
}
