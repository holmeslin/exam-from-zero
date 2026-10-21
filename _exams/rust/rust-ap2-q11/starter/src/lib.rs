pub async fn run_each<F>(items: &[&str], action: F)
where
    F: AsyncFn(&str),
{
    let _ = (items, action);
    todo!("依序對每個 item 呼叫 action 並 .await")
}
