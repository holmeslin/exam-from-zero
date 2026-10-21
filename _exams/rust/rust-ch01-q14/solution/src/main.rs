fn main() {
    println!("請輸入一個數字：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let num = input.trim().parse::<i32>().expect("不是數字");

    println!("{} 加 10 等於 {}", num, num + 10);
}
