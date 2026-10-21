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

    let name = match season {
        Season::Spring => "春天",
        Season::Summer => "夏天",
        Season::Autumn => "秋天",
        Season::Winter => "冬天",
    };
    println!("{}", name);

    let clothes = match season {
        Season::Spring => "薄外套",
        Season::Summer => "短袖",
        Season::Autumn => {
            println!("早晚溫差大");
            "長袖"
        }
        Season::Winter => "大衣",
    };
    println!("建議穿著：{}", clothes);
}
