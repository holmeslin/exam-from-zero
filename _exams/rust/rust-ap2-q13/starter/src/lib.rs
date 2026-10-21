pub fn numbered<'a>(_label: &'a str, n: u32) -> impl Iterator<Item = u32> {
    1..=n
}
