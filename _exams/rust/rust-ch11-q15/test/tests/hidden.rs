use rust_ch11_q15::try_update;

#[test]
fn hidden_success() {
    let mut v = vec![1, 2, 3];
    assert!(try_update(&mut v, |d| d.push(4)), "沒有 panic 時應該回傳 true");
    assert_eq!(v, vec![1, 2, 3, 4], "成功時要保留修改");
}

#[test]
fn hidden_panic_restores() {
    let mut v = vec![1, 2, 3];
    let ok = try_update(&mut v, |d| {
        d.push(4);
        d.remove(0);
        panic!("改到一半出事了");
    });
    assert!(!ok, "panic 時應該回傳 false");
    assert_eq!(v, vec![1, 2, 3], "panic 後 data 要恢復成呼叫前的內容");

    let ok = try_update(&mut v, |d| {
        d.clear();
        let _ = d[5];
    });
    assert!(!ok, "索引越界也是 panic，應該回傳 false");
    assert_eq!(v, vec![1, 2, 3], "panic 後 data 要恢復成呼叫前的內容");
}
