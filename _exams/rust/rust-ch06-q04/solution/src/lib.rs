// 呼叫 f 共 n 次，把每次的回傳值依序收進 Vec
pub fn repeat_call(n: usize, mut f: impl FnMut() -> i32) -> Vec<i32> {
    let mut results = Vec::new();
    for _ in 0..n {
        results.push(f());
    }
    results
}
