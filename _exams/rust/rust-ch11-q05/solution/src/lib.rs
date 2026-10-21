use std::collections::HashSet;

/// 回傳 (兩邊都有的數字, 只在 a 出現的數字)。
/// 兩個 Vec 都不能有重複，並且由小到大排序。
pub fn compare(a: &[i32], b: &[i32]) -> (Vec<i32>, Vec<i32>) {
    let a: HashSet<i32> = a.iter().copied().collect();
    let b: HashSet<i32> = b.iter().copied().collect();
    let mut both: Vec<i32> = (&a & &b).into_iter().collect();
    let mut only_a: Vec<i32> = (&a - &b).into_iter().collect();
    both.sort();
    only_a.sort();
    (both, only_a)
}
