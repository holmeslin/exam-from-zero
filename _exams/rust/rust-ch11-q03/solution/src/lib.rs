use std::cmp::Reverse;

/// 依分數由高到低排序；分數相同時，依名字由小到大（字典順序）。
pub fn rank(players: &mut Vec<(String, u32)>) {
    players.sort_by_key(|(name, score)| (Reverse(*score), name.clone()));
}
