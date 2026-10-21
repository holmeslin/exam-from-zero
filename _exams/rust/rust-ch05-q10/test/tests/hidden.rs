use rust_ch05_q10::{Celsius, Fahrenheit, Percent};

fn hidden_close(a: f64, b: f64) -> bool {
    (a - b).abs() < 1e-9
}

#[test]
fn hidden_from_and_into() {
    let f = Fahrenheit::from(Celsius { value: 100.0 });
    assert!(hidden_close(f.value, 212.0), "100°C 應該是 212°F，實際得到 {}", f.value);
    let g: Fahrenheit = Celsius { value: -40.0 }.into();
    assert!(hidden_close(g.value, -40.0), "-40°C 應該是 -40°F，實際得到 {}", g.value);
}

#[test]
fn hidden_try_from_ok() {
    let p = Percent::try_from(0);
    assert!(p.is_ok(), "0 應該轉換成功");
    let q: Result<Percent, String> = 100i32.try_into();
    match q {
        Ok(p) => assert_eq!(p.value, 100, "100 轉換後 value 應該是 100"),
        Err(e) => panic!("100 應該轉換成功，卻得到錯誤：{}", e),
    }
}

#[test]
fn hidden_try_from_err() {
    match Percent::try_from(150) {
        Ok(p) => panic!("150 應該失敗，卻得到 {}", p.value),
        Err(e) => assert_eq!(e, "超出範圍：150", "錯誤訊息格式不對"),
    }
    match Percent::try_from(-1) {
        Ok(p) => panic!("-1 應該失敗，卻得到 {}", p.value),
        Err(e) => assert_eq!(e, "超出範圍：-1", "錯誤訊息格式不對"),
    }
}
