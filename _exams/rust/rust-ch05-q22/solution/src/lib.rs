use std::borrow::Cow;

pub fn normalize_tabs(s: &str) -> Cow<'_, str> {
    if s.contains('\t') {
        Cow::Owned(s.replace('\t', " "))
    } else {
        Cow::Borrowed(s)
    }
}
