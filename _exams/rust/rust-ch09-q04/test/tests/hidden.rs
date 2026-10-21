use rust_ch09_q04::count_in_threads;
use std::sync::Arc;

fn strings(v: &[&str]) -> Vec<String> {
    v.iter().map(|s| s.to_string()).collect()
}

#[test]
fn counts_in_target_order() {
    let words = Arc::new(strings(&["a", "b", "a", "c", "a", "b"]));
    let got = count_in_threads(Arc::clone(&words), strings(&["a", "b", "c", "z"]));
    assert_eq!(got, vec![3, 2, 1, 0], "結果要依照 targets 的順序排列");
    assert_eq!(Arc::strong_count(&words), 1, "函式回傳後，執行緒裡的 Arc clone 應該都已經被 drop 了（記得 join）");
}

#[test]
fn no_targets() {
    let words = Arc::new(strings(&["x"]));
    assert_eq!(count_in_threads(words, vec![]), Vec::<usize>::new(), "沒有 target 時回傳空的 Vec");
}
