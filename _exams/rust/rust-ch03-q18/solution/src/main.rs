fn main() {
    let students = [("Alice", 85), ("Bob", 92), ("Carol", 78)];

    let (mut best_name, mut best_score) = students[0];
    for (name, score) in students {
        println!("{}: {}", name, score);
        if score > best_score {
            best_name = name;
            best_score = score;
        }
    }
    println!("最高分：{} {}", best_name, best_score);
}
