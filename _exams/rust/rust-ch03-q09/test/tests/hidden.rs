use rust_ch03_q09::{judge, Hand};

#[test]
fn hidden_a_wins() {
    assert_eq!(judge(Hand::Rock, Hand::Scissors), 1, "石頭贏剪刀");
    assert_eq!(judge(Hand::Paper, Hand::Rock), 1, "布贏石頭");
    assert_eq!(judge(Hand::Scissors, Hand::Paper), 1, "剪刀贏布");
}

#[test]
fn hidden_b_wins() {
    assert_eq!(judge(Hand::Scissors, Hand::Rock), -1, "剪刀輸石頭");
    assert_eq!(judge(Hand::Rock, Hand::Paper), -1, "石頭輸布");
    assert_eq!(judge(Hand::Paper, Hand::Scissors), -1, "布輸剪刀");
}

#[test]
fn hidden_draw() {
    assert_eq!(judge(Hand::Rock, Hand::Rock), 0, "石頭對石頭是平手");
    assert_eq!(judge(Hand::Paper, Hand::Paper), 0, "布對布是平手");
    assert_eq!(judge(Hand::Scissors, Hand::Scissors), 0, "剪刀對剪刀是平手");
}
