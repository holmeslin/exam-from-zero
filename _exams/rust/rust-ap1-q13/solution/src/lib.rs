pub trait Animal {
    fn category() -> &'static str;
}

pub trait Robot {
    fn category() -> &'static str;
}

pub struct CyberDog;

impl Animal for CyberDog {
    fn category() -> &'static str {
        "哺乳類"
    }
}

impl Robot for CyberDog {
    fn category() -> &'static str {
        "人工智慧"
    }
}

/// 回傳 (CyberDog 在 Animal 上的 category, CyberDog 在 Robot 上的 category)
pub fn categories() -> (&'static str, &'static str) {
    (<CyberDog as Animal>::category(), <CyberDog as Robot>::category())
}
