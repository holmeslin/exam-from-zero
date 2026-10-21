pub fn select_from_both<'first, 'second, T, F>(
    first: &'first [T],
    second: &'second [T],
    choose: F,
) -> (Option<&'first T>, Option<&'second T>)
where
    F: for<'a> Fn(&'a [T]) -> Option<&'a T>,
{
    let from_first = choose(first);
    let from_second = choose(second);
    (from_first, from_second)
}
