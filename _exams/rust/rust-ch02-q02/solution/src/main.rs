fn main() {
    for _ in 0..3 {
        println!("請輸入密碼：");

        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("讀取失敗");

        if input.trim() == "rust" {
            println!("登入成功");
            break;
        } else {
            println!("密碼錯誤");
        }
    }
}
