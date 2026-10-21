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
        match self.next_value {
            None => None,
            Some(current) => {
                self.next_value = if current == 1 {
                    None
                } else if current % 2 == 0 {
                    Some(current / 2)
                } else {
                    Some(current * 3 + 1)
                };
                Some(current)
            }
        }
    }
}
