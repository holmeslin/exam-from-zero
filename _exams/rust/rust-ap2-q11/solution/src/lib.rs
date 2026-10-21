pub async fn run_each<F>(items: &[&str], mut action: F)
where
    F: AsyncFnMut(&str),
{
    for &item in items {
        action(item).await;
    }
}
