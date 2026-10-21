pub fn parse_num(s: &str) -> Result<i32, String> {
    match s.trim().parse::<i32>() {
        Ok(n) => Ok(n),
        Err(_) => Err(format!("'{}' 不是整數", s)),
    }
}

pub fn add_all(a: &str, b: &str, c: &str) -> Result<i32, String> {
    let x = parse_num(a)?;
    let y = parse_num(b)?;
    let z = parse_num(c)?;
    Ok(x + y + z)
}

pub fn first_doubled(numbers: &[i32]) -> Option<i32> {
    let first = numbers.first()?;
    Some(*first * 2)
}
