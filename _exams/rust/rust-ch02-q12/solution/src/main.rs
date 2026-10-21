fn total_steps(steps: &[i32]) -> i32 {
    let mut total = 0;

    for step in steps {
        total += step;
    }

    total
}

fn main() {
    let mut steps = [0; 7];

    for i in 0..7 {
        println!("請輸入第 {} 天步數：", i + 1);

        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("讀取失敗");

        let step = input.trim().parse::<i32>().expect("不是數字");
        steps[i] = step;
    }

    let week_total = total_steps(&steps);
    let weekday_total = total_steps(&steps[..5]);
    let weekend_total = total_steps(&steps[5..]);

    let week_verdict = if week_total >= 7 * 8000 { "達標" } else { "未達標" };
    println!("一整週總步數 {}，{}", week_total, week_verdict);

    let weekday_verdict = if weekday_total >= 5 * 8000 { "達標" } else { "未達標" };
    println!("平日總步數 {}，{}", weekday_total, weekday_verdict);

    let weekend_verdict = if weekend_total >= 2 * 8000 { "達標" } else { "未達標" };
    println!("週末總步數 {}，{}", weekend_total, weekend_verdict);
}
