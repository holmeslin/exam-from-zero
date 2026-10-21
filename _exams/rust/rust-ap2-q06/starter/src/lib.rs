pub fn choose_shorter<'short>(long: &'static str, short: &'short str, use_long: bool) -> &'short str {
    let _ = (long, short, use_long);
    todo!("use_long 為 true 回傳 long，否則回傳 short")
}
