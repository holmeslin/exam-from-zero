pub mod bank {
    pub struct Account {
        owner: String,
        balance: u64,
    }

    impl Account {
        fn new(owner: &str) -> Account {
            todo!()
        }

        fn balance(&self) -> u64 {
            todo!()
        }

        fn deposit(&mut self, amount: u64) {
            todo!()
        }
    }
}
