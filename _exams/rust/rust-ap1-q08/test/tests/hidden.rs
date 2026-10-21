use rust_ap1_q08::{game_config, resized, Config};

#[test]
fn check_game_config() {
    let c = game_config("Snake");
    assert_eq!(
        c,
        Config { width: 800, height: 600, fullscreen: true, title: String::from("Snake") },
        "game_config 只改 fullscreen 和 title，width/height 要用預設值"
    );
}

#[test]
fn check_resized() {
    let base = Config { width: 1, height: 2, fullscreen: true, title: String::from("Base") };
    let r = resized(base, 1920, 1080);
    assert_eq!(
        r,
        Config { width: 1920, height: 1080, fullscreen: true, title: String::from("Base") },
        "resized 只換 width/height，其他欄位沿用 base（不是預設值）"
    );
}
