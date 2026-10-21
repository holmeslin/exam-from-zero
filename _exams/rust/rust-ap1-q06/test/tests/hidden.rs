use rust_ap1_q06::format_row;

#[test]
fn check_format_row() {
    assert_eq!(format_row(42, "Andy", 87.5678), "00042|[Andy  ]|  87.57|{0x2a}", "id=42, name=Andy, score=87.5678");
    assert_eq!(format_row(7, "Bob", 100.0), "00007|[Bob   ]| 100.00|{0x07}", "id=7, name=Bob, score=100.0");
    assert_eq!(format_row(255, "Cathy", 3.14159), "00255|[Cathy ]|   3.14|{0xff}", "id=255, name=Cathy, score=3.14159");
}
