use rust_ap2_q04::select_from_both;

#[test]
fn keeps_both_lifetimes() {
    let long_lived = vec![3, 9, 4];
    let from_long;
    {
        let short_lived = vec![7, 1];
        let (a, b) = select_from_both(&long_lived, &short_lived, |items| items.iter().max());
        assert_eq!(b, Some(&7), "第二份資料的最大值應該是 7");
        from_long = a;
    }
    // 第一個結果只借用 long_lived，第二份資料離開作用域後仍可使用。
    assert_eq!(from_long, Some(&9), "第一份資料的最大值應該是 9");
}

#[test]
fn empty_slice_gives_none() {
    let empty: [i32; 0] = [];
    let words = ["a", "b"];
    let (a, b) = select_from_both(&empty, &empty, |items| items.first());
    assert_eq!((a, b), (None, None), "空 slice 應該回傳 None");
    let (c, _) = select_from_both(&words, &words, |items| items.last());
    assert_eq!(c, Some(&"b"), "應回傳 choose 選出的元素");
}
