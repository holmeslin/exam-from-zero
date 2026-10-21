pub struct Player {
    pub name: String,
    pub score: i32,
}

pub fn winner_name(players: &[Player]) -> String {
    let mut best = &players[0];
    for p in players {
        if p.score > best.score {
            best = p;
        }
    }
    best.name
}
