pub struct Pair<T> {
    pub first: T,
    pub second: T,
}

// 下面兩個方法需要 T 有特定能力才寫得出來，請幫它們加上 trait bound
// （可以拆成兩個 impl 區塊）
impl<T> Pair<T> {
    // 回傳 (first 的 clone, second 的 clone)
    pub fn to_tuple(&self) -> (T, T) {
        todo!()
    }

    // 回傳兩者中較大的那個（一樣大就回傳 first）
    pub fn larger(&self) -> T {
        todo!()
    }
}
