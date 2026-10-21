use std::borrow::Cow;

// 把字串裡的 tab（'\t'）換成一個空白。
// 沒有 tab 時不要建立新字串，直接借用原本的 s。
pub fn normalize_tabs(s: &str) -> Cow<'_, str> {
    Cow::Owned(String::from(s))
}
