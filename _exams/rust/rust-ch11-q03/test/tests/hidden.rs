use rust_ch11_q03::rank;

fn owned(v: &[(&str, u32)]) -> Vec<(String, u32)> {
    v.iter().map(|(n, s)| (n.to_string(), *s)).collect()
}

#[test]
fn hidden_rank_order() {
    let mut p = owned(&[("Zoe", 80), ("Amy", 60), ("Cat", 95), ("Bob", 80)]);
    rank(&mut p);
    assert_eq!(p, owned(&[("Cat", 95), ("Bob", 80), ("Zoe", 80), ("Amy", 60)]),
        "應該分數由高到低；同分時名字由小到大");
}

#[test]
fn hidden_rank_all_tied() {
    let mut p = owned(&[("Eve", 70), ("Dan", 70), ("Ann", 70)]);
    rank(&mut p);
    assert_eq!(p, owned(&[("Ann", 70), ("Dan", 70), ("Eve", 70)]), "全部同分時只看名字");
}
