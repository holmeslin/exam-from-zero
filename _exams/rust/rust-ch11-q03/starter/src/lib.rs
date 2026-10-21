use std::cmp::Reverse;

/// 依分數由高到低排序；分數相同時，依名字由小到大（字典順序）。
pub fn rank(players: &mut Vec<(String, u32)>) {
    // TODO：目前只會依名字排序，請改成題目要求的順序
    players.sort();
}
