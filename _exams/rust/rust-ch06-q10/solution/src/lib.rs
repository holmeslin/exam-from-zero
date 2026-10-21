// 把一串個位數字組成一個整數，例如 [1, 2, 3] -> 123
pub fn digits_to_number(digits: &[u32]) -> u64 {
    digits.iter().fold(0, |acc, d| acc * 10 + *d as u64)
}
