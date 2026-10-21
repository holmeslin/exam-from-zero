// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Command {
    SetVolume(i32),
    VolumeUp(i32),
    Mute,
}

pub fn apply(current: i32, cmd: Command) -> i32 {
    match cmd {
        Command::SetVolume(level @ 0..=100) => level,
        Command::SetVolume(_) => current,
        Command::VolumeUp(step) => {
            let next = current + step;
            match next {
                v @ 0..=100 => v,
                ..0 => 0,
                _ => 100,
            }
        }
        Command::Mute => 0,
    }
}
