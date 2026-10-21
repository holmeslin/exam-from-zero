use rust_ch03_q10::edge_product;

#[test]
fn hidden_short_slices() {
    assert_eq!(edge_product(&[]), 0, "空切片應該回傳 0");
    assert_eq!(edge_product(&[7]), 49, "[7] 頭尾都是 7，應該回傳 7 * 7 = 49");
    assert_eq!(edge_product(&[3, 4]), 12, "[3, 4] 應該回傳 3 * 4 = 12");
}

#[test]
fn hidden_long_slices() {
    assert_eq!(edge_product(&[2, 100, 5]), 10, "[2, 100, 5] 應該回傳 2 * 5 = 10");
    assert_eq!(edge_product(&[10, 20, 30, 40, 50]), 500, "[10, 20, 30, 40, 50] 應該回傳 10 * 50 = 500");
    assert_eq!(edge_product(&[-3, 1, 1, 4]), -12, "[-3, 1, 1, 4] 應該回傳 -3 * 4 = -12");
}
