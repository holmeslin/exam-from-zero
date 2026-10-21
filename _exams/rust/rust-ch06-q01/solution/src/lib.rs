pub fn apply_twice(f: fn(i32) -> i32, x: i32) -> i32 {
    f(f(x))
}
