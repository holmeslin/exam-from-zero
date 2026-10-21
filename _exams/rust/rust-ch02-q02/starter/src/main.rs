fn main() {
    // 改成最多讓使用者輸入 3 次：用 for _ in 0..3，答對要 break
    println!("請輸入密碼：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    if input.trim() == "rust" {
        println!("登入成功");
    } else {
        println!("密碼錯誤");
    }
}
