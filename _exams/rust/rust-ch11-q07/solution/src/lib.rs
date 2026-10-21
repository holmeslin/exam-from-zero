use std::collections::VecDeque;

/// 1 到 n 號圍成一圈，從 1 號開始報數，每報到第 k 個人就淘汰他，
/// 再從下一個人重新報數。回傳淘汰的順序（最後剩下的人也要放進去）。
/// k 至少是 1。
pub fn elimination_order(n: usize, k: usize) -> Vec<usize> {
    let mut circle: VecDeque<usize> = (1..=n).collect();
    let mut order = Vec::new();
    while !circle.is_empty() {
        for _ in 0..k - 1 {
            let front = circle.pop_front().unwrap();
            circle.push_back(front);
        }
        order.push(circle.pop_front().unwrap());
    }
    order
}
