// 在這裡宣告常數 PASS_SCORE

fn main() {
    println!("請輸入分數：");

    let mut score_input = String::new();
    std::io::stdin().read_line(&mut score_input).expect("讀取失敗");
    let score = score_input.trim().parse::<i32>().expect("不是數字");

    // 用 PASS_SCORE 判斷，印出「及格」或「不及格」
}
