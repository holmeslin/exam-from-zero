pub fn find_index(items: &[i32], target: i32) -> Option<usize> {
    for i in 0..items.len() {
        if items[i] == target {
            return Some(i);
        }
    }
    None
}
