use rust_ch03_q21::{Command, Robot};

#[test]
fn hidden_new() {
    let r = Robot::new();
    assert_eq!((r.x, r.y, r.moves), (0, 0, 0), "Robot::new() 應該在 (0, 0)，moves 為 0");
}

#[test]
fn hidden_move_and_teleport() {
    let r = Robot::new()
        .execute(Command::Move { dx: 2, dy: 3 })
        .execute(Command::Move { dx: -5, dy: 1 });
    assert_eq!((r.x, r.y, r.moves), (-3, 4, 2), "移動 (2, 3) 再移動 (-5, 1) 後應該在 (-3, 4)，moves 為 2");

    let r = r.execute(Command::Teleport(10, -7));
    assert_eq!((r.x, r.y, r.moves), (10, -7, 3), "Teleport(10, -7) 後應該在 (10, -7)，moves 為 3");
}

#[test]
fn hidden_reset() {
    let r = Robot::new()
        .execute(Command::Move { dx: 4, dy: 4 })
        .execute(Command::Reset);
    assert_eq!((r.x, r.y, r.moves), (0, 0, 0), "Reset 之後應該回到 (0, 0)，moves 歸零");
}

#[test]
fn hidden_distance() {
    let d = Robot::new().execute(Command::Teleport(-3, 4)).distance();
    assert_eq!(d, 7, "(-3, 4) 的距離應該是 3 + 4 = 7");
    let d = Robot::new().execute(Command::Move { dx: 5, dy: -6 }).distance();
    assert_eq!(d, 11, "(5, -6) 的距離應該是 5 + 6 = 11");
}
