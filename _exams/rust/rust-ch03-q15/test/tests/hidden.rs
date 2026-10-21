use rust_ch03_q15::{review, Request};

#[test]
fn hidden_rejected() {
    assert_eq!(review(Request::Transfer { from: 7, to: 7, amount: 100 }, 1000), 0, "轉給自己（from == to）應該拒絕，回傳 0");
    assert_eq!(review(Request::Transfer { from: 7, to: 7, amount: 5000 }, 1000), 0, "轉給自己就算金額超過上限也應該拒絕，回傳 0");
    assert_eq!(review(Request::Transfer { from: 1, to: 2, amount: 0 }, 1000), 0, "金額 0 應該拒絕，回傳 0");
    assert_eq!(review(Request::Transfer { from: 1, to: 2, amount: -50 }, 1000), 0, "金額為負應該拒絕，回傳 0");
}

#[test]
fn hidden_needs_confirm() {
    assert_eq!(review(Request::Transfer { from: 1, to: 2, amount: 1500 }, 1000), 1, "1500 超過上限 1000，應該回傳 1");
    assert_eq!(review(Request::Transfer { from: 1, to: 2, amount: 600 }, 500), 1, "600 超過上限 500，應該回傳 1");
}

#[test]
fn hidden_pass_and_check() {
    assert_eq!(review(Request::Transfer { from: 1, to: 2, amount: 1000 }, 1000), 2, "1000 剛好等於上限，應該直接通過，回傳 2");
    assert_eq!(review(Request::Transfer { from: 1, to: 2, amount: 300 }, 1000), 2, "300 沒超過上限，應該回傳 2");
    assert_eq!(review(Request::CheckBalance { account: 9 }, 1000), 3, "查詢餘額應該回傳 3");
}
