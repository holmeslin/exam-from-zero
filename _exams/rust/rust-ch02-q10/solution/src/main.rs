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

    let temperatures = [day1, day2, day3];

    println!("三天溫度：{:?}", temperatures);
    println!("第一天溫度：{}", temperatures[0]);
    println!("第三天溫度：{}", temperatures[2]);
    let difference = if temperatures[2] >= temperatures[0] {
        temperatures[2] - temperatures[0]
    } else {
        temperatures[0] - temperatures[2]
    };

    println!("第一天和第三天差 {} 度", difference);
}
