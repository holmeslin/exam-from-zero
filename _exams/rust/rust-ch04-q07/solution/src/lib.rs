pub fn make_greeting(name: &str) -> String {
    format!("你好，{}！", name)
}

pub fn add_suffix(s: &mut String, suffix: &str) {
    s.push_str(suffix);
}
