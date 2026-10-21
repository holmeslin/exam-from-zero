pub fn parse_score(s: &str) -> Result<u32, String> {
    let s = s.trim();
    s.parse::<u32>()
        .map_err(|_| format!("不是數字：{}", s))
        .and_then(|n| {
            if n <= 100 {
                Ok(n)
            } else {
                Err(format!("超出範圍：{}", n))
            }
        })
}
