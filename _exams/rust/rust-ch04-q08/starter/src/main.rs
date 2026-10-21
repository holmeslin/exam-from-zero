fn sum(nums: &[i32]) -> i32 {
    let mut total = 0;
    for x in nums {
        total += x;
    }
    total
}

fn main() {
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");
    let n = input.trim().parse::<i32>().expect("不是數字");

    let mut scores = Vec::new();
    for _ in 0..n {
        let mut line = String::new();
        std::io::stdin().read_line(&mut line).expect("讀取失敗");
        let score = line.trim().parse::<i32>().expect("不是數字");
        // 把 score 放進 scores
    }
    scores.push(0);

    // 依題目格式印出成績、筆數、總分，以及每筆是否及格
    println!("成績：{:?}", scores);
}
