fn main() {
    let names = vec!["Alice", "Bob", "Carol", "Dave"];
    let scores = vec![95, 88, 72];

    let mut count = 0;
    for (i, (name, score)) in names.iter().zip(scores.iter()).enumerate() {
        println!("第 {} 名：{} {} 分", i + 1, name, score);
        count += 1;
    }
    println!("共 {} 人", count);
}
