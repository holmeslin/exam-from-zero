// 幫每個分數加上 bonus（原地修改）
pub fn add_bonus(scores: &mut Vec<i32>, bonus: i32) {
    for s in scores.iter_mut() {
        *s += bonus;
    }
}
