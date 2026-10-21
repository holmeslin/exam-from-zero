use rust_ch03_q12::grade;

#[test]
fn hidden_grades() {
    let cases = [
        (100, 'A'), (90, 'A'), (89, 'B'), (80, 'B'), (79, 'C'), (70, 'C'),
        (69, 'D'), (60, 'D'), (59, 'F'), (0, 'F'),
    ];
    for (score, want) in cases {
        assert_eq!(grade(score), want, "grade({}) 應該是 '{}'", score, want);
    }
}

#[test]
fn hidden_out_of_range() {
    assert_eq!(grade(101), '?', "grade(101) 超出範圍，應該是 '?'");
    assert_eq!(grade(-1), '?', "grade(-1) 超出範圍，應該是 '?'");
}
