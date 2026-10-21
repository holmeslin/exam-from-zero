// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub struct Robot {
    pub x: i32,
    pub y: i32,
    pub moves: i32,
}

pub enum Command {
    Move { dx: i32, dy: i32 },
    Teleport(i32, i32),
    Reset,
}

impl Robot {
    pub fn new() -> Self {
        todo!("回傳停在 (0, 0)、moves 為 0 的機器人")
    }

    pub fn execute(self, cmd: Command) -> Self {
        todo!("依指令回傳新的 Robot")
    }

    pub fn distance(self) -> i32 {
        todo!("回傳 x 的絕對值加 y 的絕對值")
    }
}
