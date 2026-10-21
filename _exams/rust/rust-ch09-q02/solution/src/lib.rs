use std::thread::{self, JoinHandle};

pub fn spawn_greeting(name: String) -> JoinHandle<String> {
    thread::spawn(move || format!("Hello, {}!", name))
}
