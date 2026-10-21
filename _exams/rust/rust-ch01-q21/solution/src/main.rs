fn main() {
    println!("請輸入上限：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let n = input.trim().parse::<i32>().expect("不是數字");

    'outer: for num in 2..=n {
        for divisor in 2..num {
            if num % divisor == 0 {
                continue 'outer;
            }
        }

        println!("{}", num);
    }
}
