pub fn remove_below(v: &mut Vec<i32>, threshold: i32) {
    v.retain(|x| *x >= threshold);
}
