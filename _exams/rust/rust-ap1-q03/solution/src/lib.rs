/// 回傳第一個「大於 limit」的平方數（1、4、9、16……）
pub fn first_square_above(limit: u32) -> u32 {
    let mut n = 1;
    let result = loop {
        let square = n * n;
        if square > limit {
            break square;
        }
        n += 1;
    };
    result
}
