use rust_ch05_q02::Either;

#[test]
fn hidden_is_left() {
    let a: Either<i32, &str> = Either::Left(1);
    let b: Either<i32, &str> = Either::Right("x");
    assert!(a.is_left(), "Left(1).is_left() 應該是 true");
    assert!(!b.is_left(), "Right(\"x\").is_left() 應該是 false");
}

#[test]
fn hidden_left() {
    let a: Either<i32, &str> = Either::Left(7);
    let b: Either<i32, &str> = Either::Right("x");
    assert_eq!(a.left(), Some(7), "Left(7).left() 應該是 Some(7)");
    assert_eq!(b.left(), None, "Right(\"x\").left() 應該是 None");
}

#[test]
fn hidden_flip() {
    let a: Either<i32, String> = Either::Left(3);
    let b: Either<i32, String> = Either::Right(String::from("hi"));
    assert_eq!(a.flip(), Either::Right(3), "Left(3).flip() 應該是 Right(3)");
    assert_eq!(b.flip(), Either::Left(String::from("hi")), "Right(\"hi\").flip() 應該是 Left(\"hi\")");
}
