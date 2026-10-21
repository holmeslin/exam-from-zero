fn main() {
    println!("請輸入第一天溫度：");

    let mut day1_input = String::new();
    std::io::stdin().read_line(&mut day1_input).expect("讀取失敗");
    let day1 = day1_input.trim().parse::<i32>().expect("不是數字");

    println!("請輸入第二天溫度：");

    let mut day2_input = String::new();
    std::io::stdin().read_line(&mut day2_input).expect("讀取失敗");
    let day2 = day2_input.trim().parse::<i32>().expect("不是數字");

    println!("請輸入第三天溫度：");

    let mut day3_input = String::new();
    std::io::stdin().read_line(&mut day3_input).expect("讀取失敗");
    let day3 = day3_input.trim().parse::<i32>().expect("不是數字");

    // 把三天溫度放進陣列 temperatures，再印出整個陣列、第一天、第三天和溫差
}
