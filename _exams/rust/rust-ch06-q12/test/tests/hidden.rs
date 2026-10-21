use rust_ch06_q12::decode;

#[test]
fn hidden_decode() {
    assert_eq!(decode(&[('a', 3), ('b', 1), ('c', 2)]), "aaabcc", "[('a', 3), ('b', 1), ('c', 2)] 應該展開成 \"aaabcc\"");
    assert_eq!(decode(&[('x', 0), ('y', 2)]), "yy", "次數 0 的字元不出現");
    assert_eq!(decode(&[]), "", "空切片得到空字串");
    assert_eq!(decode(&[('好', 2)]), "好好", "中文字元也要能展開");
}
