fn main() {
    let mut expenses = [0; 5];

    for i in 0..5 {
        println!("請輸入第 {} 筆花費：", i + 1);

        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("讀取失敗");

        let expense = input.trim().parse::<i32>().expect("不是數字");
        // 把 expense 放進 expenses[i]
    }

    // 用 for expense in expenses 走訪：印出每筆花費、標出比較高的，並算出總花費
}
