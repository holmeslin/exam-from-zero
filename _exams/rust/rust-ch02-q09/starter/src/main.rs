fn print_collatz(n: i32) {
    println!("{}", n);

    // n 是 1 就停止；否則依照奇偶算出下一個數，再呼叫自己
}

fn main() {
    println!("請輸入起始數字：");

    let mut n_input = String::new();
    std::io::stdin().read_line(&mut n_input).expect("讀取失敗");
    let n = n_input.trim().parse::<i32>().expect("不是數字");

    print_collatz(n);
}
