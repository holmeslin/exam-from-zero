use rust_ch04_q01::{Bird, Dog, Legs};

#[test]
fn hidden_legs() {
    assert_eq!(Bird.legs(), 2, "Bird 應該有 2 條腿");
    assert_eq!(Dog.legs(), 4, "Dog 應該有 4 條腿");
}
