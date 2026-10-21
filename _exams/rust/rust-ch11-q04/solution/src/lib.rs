use std::collections::HashMap;

/// 統計每個單字出現幾次：單字用空白分隔，一律轉成小寫再計數。
pub fn word_counts(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();
    for word in text.split_whitespace() {
        *counts.entry(word.to_lowercase()).or_insert(0) += 1;
    }
    counts
}
