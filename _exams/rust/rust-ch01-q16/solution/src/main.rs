fn main() {
    loop {
        println!("請輸入一個正數：");

        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("讀取失敗");

        let num = input.trim().parse::<i32>().expect("不是數字");

        if num > 0 {
            println!("收到正數！");
            break;
        } else {
            println!("請再試一次");
        }
    }
}
