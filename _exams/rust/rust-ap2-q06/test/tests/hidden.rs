use rust_ap2_q06::choose_shorter;

#[test]
fn picks_by_flag() {
    let local = String::from("區域字串");
    assert_eq!(choose_shorter("長期資料", &local, true), "長期資料", "use_long 為 true 時應回傳 long");
    assert_eq!(choose_shorter("長期資料", &local, false), "區域字串", "use_long 為 false 時應回傳 short");
}
