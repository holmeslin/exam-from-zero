use rust_ch03_q13::classify;

#[test]
fn hidden_vowels() {
    for c in ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'] {
        assert_eq!(classify(c), 1, "'{}' 是母音，應該回傳 1", c);
    }
}

#[test]
fn hidden_consonants() {
    for c in ['b', 'z', 'y', 'B', 'Z', 'Y'] {
        assert_eq!(classify(c), 2, "'{}' 是母音以外的英文字母，應該回傳 2", c);
    }
}

#[test]
fn hidden_digits_and_others() {
    for c in ['0', '5', '9'] {
        assert_eq!(classify(c), 3, "'{}' 是數字，應該回傳 3", c);
    }
    for c in [' ', '!', '哈', '_'] {
        assert_eq!(classify(c), 0, "'{}' 不是英文字母也不是數字，應該回傳 0", c);
    }
}
