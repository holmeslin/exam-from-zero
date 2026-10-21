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
        // TODO：把 parts[1] 解析成分數，累加到 parts[0] 這個名字底下
    }
    // TODO：依名字順序印出「名字: 總分」
}
