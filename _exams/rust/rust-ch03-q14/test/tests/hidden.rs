use rust_ch03_q14::{apply, Command};

#[test]
fn hidden_set_volume() {
    assert_eq!(apply(30, Command::SetVolume(72)), 72, "SetVolume(72) 在範圍內，音量應該變 72");
    assert_eq!(apply(30, Command::SetVolume(0)), 0, "SetVolume(0) 在範圍內，音量應該變 0");
    assert_eq!(apply(30, Command::SetVolume(100)), 100, "SetVolume(100) 在範圍內，音量應該變 100");
    assert_eq!(apply(30, Command::SetVolume(101)), 30, "SetVolume(101) 超出範圍，音量應該維持 30");
    assert_eq!(apply(30, Command::SetVolume(-5)), 30, "SetVolume(-5) 超出範圍，音量應該維持 30");
}

#[test]
fn hidden_volume_up() {
    assert_eq!(apply(30, Command::VolumeUp(20)), 50, "30 調高 20 應該是 50");
    assert_eq!(apply(90, Command::VolumeUp(20)), 100, "90 調高 20 超過 100，應該停在 100");
    assert_eq!(apply(10, Command::VolumeUp(-30)), 0, "10 調高 -30 低於 0，應該停在 0");
}

#[test]
fn hidden_mute() {
    assert_eq!(apply(55, Command::Mute), 0, "Mute 之後音量應該是 0");
}
