// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Command {
    SetVolume(i32),
    VolumeUp(i32),
    Mute,
}

pub fn apply(current: i32, cmd: Command) -> i32 {
    todo!("回傳執行指令後的音量")
}
