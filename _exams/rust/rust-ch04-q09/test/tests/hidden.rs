use rust_ch04_q09::{winner_name, Player};

#[test]
fn hidden_winner_name() {
    let players = [
        Player { name: String::from("小明"), score: 70 },
        Player { name: String::from("小花"), score: 95 },
        Player { name: String::from("阿旺"), score: 88 },
    ];
    assert_eq!(winner_name(&players), "小花", "最高分是小花");
    assert_eq!(players[1].name, "小花", "players 裡的名字應該還在");
    let solo = [Player { name: String::from("阿土"), score: 10 }];
    assert_eq!(winner_name(&solo), "阿土", "只有一個人時就是他");
}
