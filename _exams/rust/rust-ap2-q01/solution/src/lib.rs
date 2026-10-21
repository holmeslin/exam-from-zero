pub struct Config {
    pub default_language: String,
}

pub fn language_for_request<'config, 'request>(
    config: &'config Config,
    requested: Option<&'request str>,
) -> &'request str
where
    'config: 'request,
{
    match requested {
        Some(language) => language,
        None => &config.default_language,
    }
}
