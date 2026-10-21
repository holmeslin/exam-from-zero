use rust_ch06_q09::add_bonus;

#[test]
fn hidden_add_bonus() {
    let mut scores = vec![60, 75, 90];
    add_bonus(&mut scores, 5);
    assert_eq!(scores, vec![65, 80, 95], "每個分數都要加 5，而且要直接改到原本的 Vec");

    let mut neg = vec![10, 0];
    add_bonus(&mut neg, -3);
    assert_eq!(neg, vec![7, -3], "bonus 也可能是負數");
}
