fn main() {
    println!("請輸入目標數字：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let target = input.trim().parse::<i32>().expect("不是數字");

    'outer: for a in 1..=9 {
        for b in 1..=9 {
            if a * b >= target {
                println!("a = {}, b = {}", a, b);
                break 'outer;
            }
        }
    }
}
