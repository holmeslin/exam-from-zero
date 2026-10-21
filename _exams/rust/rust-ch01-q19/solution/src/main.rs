fn main() {
    println!("請輸入層數：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let levels = input.trim().parse::<i32>().expect("不是數字");

    for row in 1..=levels {
        for col in 1..=row {
            print!("*");
        }
        println!();
    }
}
