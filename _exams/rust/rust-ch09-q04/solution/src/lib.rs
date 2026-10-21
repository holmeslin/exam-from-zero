use std::sync::Arc;
use std::thread;

pub fn count_in_threads(words: Arc<Vec<String>>, targets: Vec<String>) -> Vec<usize> {
    let mut handles = vec![];
    for t in targets {
        let words = Arc::clone(&words);
        handles.push(thread::spawn(move || words.iter().filter(|w| **w == t).count()));
    }
    let mut result = vec![];
    for h in handles {
        result.push(h.join().expect("執行緒發生錯誤"));
    }
    result
}
