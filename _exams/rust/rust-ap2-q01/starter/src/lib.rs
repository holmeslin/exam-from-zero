pub struct Config {
    pub default_language: String,
}

// 目前無法編譯：只能加上生命週期之間的 bound，不要改參數與回傳型別。
pub fn language_for_request<'config, 'request>(
    config: &'config Config,
    requested: Option<&'request str>,
) -> &'request str {
    match requested {
        Some(language) => language,
        None => &config.default_language,
    }
}
