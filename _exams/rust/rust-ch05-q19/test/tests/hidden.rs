use rust_ch05_q19::Words;

#[test]
fn hidden_first_word() {
    assert_eq!(Words::new("hello brave world").first(), "hello", "第一個字是 hello");
    assert_eq!(Words::new("single").first(), "single", "沒有空白就回傳整段");
}

#[test]
fn hidden_word_outlives_words() {
    let sentence = String::from("rust is fun");
    let word;
    {
        let w = Words::new(&sentence);
        word = w.first();
    } // w 在這裡被丟棄，但 sentence 還活著
    assert_eq!(word, "rust", "Words 被丟棄後，取出的字還要能用");
}
