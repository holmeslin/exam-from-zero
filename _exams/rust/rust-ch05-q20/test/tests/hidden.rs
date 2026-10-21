use rust_ch05_q20::Version;

fn hidden_v(major: u32, minor: u32, patch: u32) -> Version {
    Version { major, minor, patch }
}

#[test]
fn hidden_equality() {
    assert_eq!(hidden_v(1, 2, 3), hidden_v(1, 2, 3), "欄位都相同的版本要相等");
    assert_ne!(hidden_v(1, 2, 3), hidden_v(1, 2, 4), "patch 不同就不相等");
}

#[test]
fn hidden_ordering_major_first() {
    assert!(hidden_v(2, 0, 0) > hidden_v(1, 9, 9), "2.0.0 要比 1.9.9 新：先比 major");
    assert!(hidden_v(1, 10, 0) > hidden_v(1, 9, 99), "1.10.0 要比 1.9.99 新：major 相同再比 minor");
    assert!(hidden_v(1, 2, 3) < hidden_v(1, 2, 4), "1.2.3 要比 1.2.4 舊");
}

#[test]
fn hidden_sort_and_default() {
    let mut list = vec![hidden_v(1, 2, 0), hidden_v(0, 9, 9), hidden_v(1, 0, 5)];
    list.sort();
    assert_eq!(
        list,
        vec![hidden_v(0, 9, 9), hidden_v(1, 0, 5), hidden_v(1, 2, 0)],
        "排序結果要由舊到新"
    );
    assert_eq!(Version::default(), hidden_v(0, 0, 0), "預設版本是 0.0.0");
}
