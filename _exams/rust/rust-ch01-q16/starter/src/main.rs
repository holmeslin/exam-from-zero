fn main() {
    // 用 loop 包住下面這段，並依照 num 判斷要不要 break
    println!("請輸入一個正數：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let num = input.trim().parse::<i32>().expect("不是數字");
}
