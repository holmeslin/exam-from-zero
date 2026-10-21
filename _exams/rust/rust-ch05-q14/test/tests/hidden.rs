use rust_ch05_q14::Visits;

fn hidden_visit_through(v: &Visits) {
    v.visit();
}

#[test]
fn hidden_counts_through_shared_refs() {
    let v = Visits::new();
    assert_eq!(v.count(), 0, "一開始是 0");
    let r1 = &v;
    let r2 = &v;
    r1.visit();
    r2.visit();
    hidden_visit_through(&v);
    assert_eq!(v.count(), 3, "透過三個共享參考各 visit 一次，應該是 3");
}
