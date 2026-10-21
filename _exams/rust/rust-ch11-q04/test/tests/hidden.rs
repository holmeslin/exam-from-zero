use rust_ch11_q04::word_counts;

#[test]
fn hidden_counts() {
    let c = word_counts("the cat  The dog\nTHE cat");
    assert_eq!(c.get("the"), Some(&3), "the / The / THE 都算同一個字，共 3 次");
    assert_eq!(c.get("cat"), Some(&2), "cat 出現 2 次");
    assert_eq!(c.get("dog"), Some(&1), "dog 出現 1 次");
    assert_eq!(c.len(), 3, "應該只有 3 個不同的單字");
}

#[test]
fn hidden_empty_text() {
    assert!(word_counts("   ").is_empty(), "只有空白時應該回傳空的 HashMap");
}
