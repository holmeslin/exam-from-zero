use rust_ch03_q19::count_steps;

#[test]
fn hidden_count_steps() {
    assert_eq!(count_steps(1), 0, "從 1 開始馬上就是 Done，應該是 0 步");
    assert_eq!(count_steps(2), 1, "2 → 1，應該是 1 步");
    assert_eq!(count_steps(6), 8, "6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1，應該是 8 步");
    assert_eq!(count_steps(27), 111, "從 27 開始應該是 111 步");
}
