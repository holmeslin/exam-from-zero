use rust_ap2_q01::{Config, language_for_request};

#[test]
fn request_or_default() {
    let config = Config {
        default_language: String::from("zh-TW"),
    };
    {
        let request_language = String::from("en");
        assert_eq!(
            language_for_request(&config, Some(&request_language)),
            "en",
            "request 有指定語言時應回傳指定的語言"
        );
    }
    assert_eq!(
        language_for_request(&config, None),
        "zh-TW",
        "request 沒指定語言時應回傳 config.default_language"
    );
}
