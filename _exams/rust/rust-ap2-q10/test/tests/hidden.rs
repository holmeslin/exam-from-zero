use rust_ap2_q10::{ChunksMut, LendingIterator};

#[test]
fn lends_mutable_chunks() {
    let mut chunks = ChunksMut::new(vec![1, 2, 3, 4, 5], 2);
    let mut lengths = Vec::new();
    while let Some(chunk) = chunks.next() {
        chunk[0] *= 10;
        lengths.push(chunk.len());
    }
    assert_eq!(lengths, vec![2, 2, 1], "每段長度應該是 2、2、1");
    assert!(chunks.next().is_none(), "用完之後 next 應該一直回傳 None");
    assert_eq!(chunks.into_inner(), vec![10, 2, 30, 4, 50], "透過借出的 slice 修改的內容要寫回 data");
}

#[test]
fn empty_data() {
    let mut chunks = ChunksMut::new(Vec::new(), 3);
    assert!(chunks.next().is_none(), "沒有資料時 next 應回傳 None");
}
