use std::collections::BTreeMap;
use std::io;

fn main() {
    let mut totals: BTreeMap<String, u32> = BTreeMap::new();
    for line in io::stdin().lines() {
        let line = line.expect("讀取失敗");
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() != 2 {
            continue;
        }
        let score: u32 = parts[1].parse().expect("分數不是數字");
        *totals.entry(parts[0].to_string()).or_insert(0) += score;
    }
    for (name, total) in &totals {
        println!("{}: {}", name, total);
    }
}
