pub struct Collatz {
    next_value: Option<u64>,
}

impl Collatz {
    pub fn new(start: u64) -> Collatz {
        Collatz { next_value: Some(start) }
    }
}

impl Iterator for Collatz {
    type Item = u64;

    fn next(&mut self) -> Option<u64> {
        None
    }
}
