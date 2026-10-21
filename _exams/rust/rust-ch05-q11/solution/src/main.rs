struct Guard {
    name: String,
}

impl Drop for Guard {
    fn drop(&mut self) {
        println!("釋放 {}", self.name);
    }
}

fn main() {
    let _a = Guard { name: String::from("A") };
    let b = Guard { name: String::from("B") };
    {
        let _c = Guard { name: String::from("C") };
        println!("內層結束");
    }
    drop(b);
    let _d = Guard { name: String::from("D") };
    println!("main 結束");
}
