// 目前無法編譯：choose 的 bound 只接受 'first 這一段生命週期。
// 請修改 where 子句，函式本體與回傳型別不要動。
pub fn select_from_both<'first, 'second, T, F>(
    first: &'first [T],
    second: &'second [T],
    choose: F,
) -> (Option<&'first T>, Option<&'second T>)
where
    F: Fn(&'first [T]) -> Option<&'first T>,
{
    let from_first = choose(first);
    let from_second = choose(second);
    (from_first, from_second)
}
