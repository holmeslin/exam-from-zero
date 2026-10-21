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
        scores.push(score);
    }

    println!("成績：{:?}", scores);
    println!("共 {} 筆", scores.len());
    println!("總分：{}", sum(&scores));
    for s in &scores {
        if *s >= 60 {
            println!("{} 及格", s);
        } else {
            println!("{} 不及格", s);
        }
    }
}
