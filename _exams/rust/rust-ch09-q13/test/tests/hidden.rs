use rust_ch09_q13::parallel_sum;

#[test]
fn sums() {
    assert_eq!(parallel_sum(&[1, 2, 3, 4, 5]), 15, "1..=5 的總和");
    assert_eq!(parallel_sum(&[]), 0, "空切片的總和是 0");
    assert_eq!(parallel_sum(&[-7]), -7, "只有一個元素");
    let v: Vec<i64> = (1..=1000).collect();
    assert_eq!(parallel_sum(&v), 500500, "1..=1000 的總和");
    assert_eq!(v.len(), 1000, "呼叫後原本的資料還能用");
}
