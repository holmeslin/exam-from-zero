#[derive(Debug, PartialEq)]
pub struct Config {
    pub width: u32,
    pub height: u32,
    pub fullscreen: bool,
    pub title: String,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            width: 800,
            height: 600,
            fullscreen: false,
            title: String::from("My App"),
        }
    }
}

/// 全螢幕的遊戲設定：fullscreen 為 true、title 為傳進來的 title，其他欄位用預設值
pub fn game_config(title: &str) -> Config {
    Config {
        fullscreen: true,
        title: String::from(title),
        ..Config::default()
    }
}

/// 以 base 為底，只把 width、height 換成新的值，其他欄位沿用 base
pub fn resized(base: Config, width: u32, height: u32) -> Config {
    Config { width, height, ..base }
}
