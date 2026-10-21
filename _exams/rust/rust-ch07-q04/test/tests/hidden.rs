use rust_ch07_q04::bank::Account;

#[test]
fn hidden_account_api() {
    let mut acc = Account::new("Ann");
    assert_eq!(acc.owner, "Ann", "owner 欄位應該是公開的，而且等於建立時給的名字");
    assert_eq!(acc.balance(), 0, "新帳戶的餘額應該是 0");
    acc.deposit(100);
    acc.deposit(50);
    assert_eq!(acc.balance(), 150, "存入 100 和 50 之後，餘額應該是 150");
}
