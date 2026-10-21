fn main() {
    let mut expenses = [0; 5];

    for i in 0..5 {
        println!("請輸入第 {} 筆花費：", i + 1);

        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("讀取失敗");

        let expense = input.trim().parse::<i32>().expect("不是數字");
        expenses[i] = expense;
    }

    let mut total = 0;

    for expense in expenses {
        println!("花費：{} 元", expense);

        if expense >= 100 {
            println!("這筆比較高");
        }

        total += expense;
    }

    println!("總花費：{} 元", total);
}
