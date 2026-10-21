const PASS_SCORE: i32 = 60;

fn main() {
    println!("請輸入分數：");

    let mut score_input = String::new();
    std::io::stdin().read_line(&mut score_input).expect("讀取失敗");
    let score = score_input.trim().parse::<i32>().expect("不是數字");

    if score >= PASS_SCORE {
        println!("及格");
    } else {
        println!("不及格");
    }
}
