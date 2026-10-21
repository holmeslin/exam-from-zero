pub fn longer<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

pub fn first_of<'a>(a: &'a str, _b: &str) -> &'a str {
    a
}
