fn main() {
    println!("請輸入目標金額：");

    let mut goal_input = String::new();
    std::io::stdin().read_line(&mut goal_input).expect("讀取失敗");

    let goal = goal_input.trim().parse::<i32>().expect("不是數字");

    println!("請輸入目前金額：");

    let mut money_input = String::new();
    std::io::stdin().read_line(&mut money_input).expect("讀取失敗");

    let mut money = money_input.trim().parse::<i32>().expect("不是數字");

    while money < goal {
        money += 30;
        println!("目前存到 {} 元", money);
    }

    println!("達標！");
}
