fn main() {
    println!("請輸入你的分數：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");

    let score = input.trim().parse::<i32>().expect("不是數字");

    if score >= 90 {
        println!("你的成績是 A");
    } else if score >= 80 {
        println!("你的成績是 B");
    } else if score >= 70 {
        println!("你的成績是 C");
    } else if score >= 60 {
        println!("你的成績是 D");
    } else {
        println!("你的成績是 F");
    }
}
