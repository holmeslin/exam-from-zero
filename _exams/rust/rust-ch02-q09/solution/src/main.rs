fn print_collatz(n: i32) {
    println!("{}", n);

    if n == 1 {
        return;
    }

    if n % 2 == 0 {
        print_collatz(n / 2);
    } else {
        print_collatz(3 * n + 1);
    }
}

fn main() {
    println!("請輸入起始數字：");

    let mut n_input = String::new();
    std::io::stdin().read_line(&mut n_input).expect("讀取失敗");
    let n = n_input.trim().parse::<i32>().expect("不是數字");

    print_collatz(n);
}
