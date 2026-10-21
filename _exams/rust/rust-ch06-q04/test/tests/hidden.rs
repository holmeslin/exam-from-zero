use rust_ch06_q04::repeat_call;

#[test]
fn hidden_repeat_call_with_state() {
    let mut count = 0;
    let got = repeat_call(4, || {
        count += 10;
        count
    });
    assert_eq!(got, vec![10, 20, 30, 40], "會修改外部變數的閉包應該被呼叫 4 次，依序回傳 10、20、30、40");
    assert_eq!(count, 40, "閉包修改的是外部的 count，呼叫完應該是 40");
}

#[test]
fn hidden_repeat_call_edge() {
    assert_eq!(repeat_call(0, || 7), Vec::<i32>::new(), "n 為 0 時一次都不呼叫，回傳空 Vec");
    assert_eq!(repeat_call(3, || 7), vec![7, 7, 7], "不捕捉變數的閉包也要能傳進來");
}
