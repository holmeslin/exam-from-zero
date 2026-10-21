pub fn choose_shorter<'short>(long: &'static str, short: &'short str, use_long: bool) -> &'short str {
    if use_long { long } else { short }
}
