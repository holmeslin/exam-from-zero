pub mod bank {
    pub struct Account {
        pub owner: String,
        balance: u64,
    }

    impl Account {
        pub fn new(owner: &str) -> Account {
            Account {
                owner: String::from(owner),
                balance: 0,
            }
        }

        pub fn balance(&self) -> u64 {
            self.balance
        }

        pub fn deposit(&mut self, amount: u64) {
            self.balance += amount;
        }
    }
}
