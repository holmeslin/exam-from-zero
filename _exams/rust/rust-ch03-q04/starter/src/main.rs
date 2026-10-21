enum Season {
    Spring,
    Summer,
    Autumn,
    Winter,
}

fn from_number(n: i32) -> Season {
    match n {
        0 => Season::Spring,
        1 => Season::Summer,
        2 => Season::Autumn,
        _ => Season::Winter,
    }
}

fn main() {
    println!("請輸入季節編號（0-3）：");

    let mut input = String::new();
    std::io::stdin().read_line(&mut input).expect("讀取失敗");
    let n = input.trim().parse::<i32>().expect("不是數字");

    let season = from_number(n);

    // TODO：用 match 表達式算出季節名稱並印出
    // TODO：再用一個 match 表達式算出穿著建議並印出
}
