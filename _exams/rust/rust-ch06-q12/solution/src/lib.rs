// 把 (字元, 次數) 展開成字串，例如 [('a', 3), ('b', 1)] -> "aaab"
pub fn decode(pairs: &[(char, usize)]) -> String {
    pairs
        .iter()
        .flat_map(|&(c, n)| std::iter::repeat(c).take(n))
        .collect()
}
