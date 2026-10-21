use rust_ch03_q22::Light;

#[test]
fn hidden_seconds() {
    assert_eq!(Light::Red.seconds(), 30, "紅燈應該是 30 秒");
    assert_eq!(Light::Yellow.seconds(), 3, "黃燈應該是 3 秒");
    assert_eq!(Light::Green.seconds(), 25, "綠燈應該是 25 秒");
}

#[test]
fn hidden_next() {
    assert_eq!(Light::Red.next().seconds(), 25, "紅燈的下一個應該是綠燈（25 秒）");
    assert_eq!(Light::Green.next().seconds(), 3, "綠燈的下一個應該是黃燈（3 秒）");
    assert_eq!(Light::Yellow.next().seconds(), 30, "黃燈的下一個應該是紅燈（30 秒）");
    assert_eq!(Light::Red.next().next().next().seconds(), 30, "紅燈換三次應該回到紅燈（30 秒）");
}
