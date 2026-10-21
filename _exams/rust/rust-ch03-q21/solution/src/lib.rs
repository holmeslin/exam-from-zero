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
        Self { x: 0, y: 0, moves: 0 }
    }

    pub fn execute(self, cmd: Command) -> Self {
        match cmd {
            Command::Move { dx, dy } => Self {
                x: self.x + dx,
                y: self.y + dy,
                moves: self.moves + 1,
            },
            Command::Teleport(x, y) => Self { x, y, moves: self.moves + 1 },
            Command::Reset => Self::new(),
        }
    }

    pub fn distance(self) -> i32 {
        let x = if self.x < 0 { -self.x } else { self.x };
        let y = if self.y < 0 { -self.y } else { self.y };
        x + y
    }
}
