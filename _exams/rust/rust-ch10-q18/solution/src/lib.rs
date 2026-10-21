pub fn fail(msg: &str) -> ! {
    panic!("{}", msg);
}

pub fn must_positive(x: i32) -> i32 {
    if x > 0 { x } else { fail("必須是正數") }
}

pub fn sum_valid(items: &[&str]) -> i32 {
    let mut total = 0;
    for item in items {
        let n: i32 = match item.parse::<i32>() {
            Ok(n) => n,
            Err(_) => continue,
        };
        total += n;
    }
    total
}
