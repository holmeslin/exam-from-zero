fn total_steps(steps: &[i32]) -> i32 {
    // 回傳切片裡所有步數的總和
    0
}

fn main() {
    let mut steps = [0; 7];

    for i in 0..7 {
        println!("請輸入第 {} 天步數：", i + 1);

        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("讀取失敗");

        let step = input.trim().parse::<i32>().expect("不是數字");
        steps[i] = step;
    }

    // 用 total_steps 搭配 &steps、&steps[..5]、&steps[5..] 算出三種總步數，各自印出並判斷是否達標
}
