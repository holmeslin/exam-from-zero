use rust_ch03_q20::{net_income, Order};

#[test]
fn hidden_paid() {
    assert_eq!(net_income(Order::Paid { amount: 500, discount: 50 }), 450, "付款 500、折扣 50，實收應該是 450");
    assert_eq!(net_income(Order::Paid { amount: 300, discount: 0 }), 300, "付款 300、沒有折扣，實收應該是 300");
    assert_eq!(net_income(Order::Paid { amount: 100, discount: 100 }), 0, "折扣等於金額，實收應該是 0");
    assert_eq!(net_income(Order::Paid { amount: 100, discount: 150 }), 0, "折扣大於金額，實收應該是 0（不能是負的）");
}

#[test]
fn hidden_not_paid() {
    assert_eq!(net_income(Order::Pending), 0, "Pending 還沒付款，應該回傳 0");
    assert_eq!(net_income(Order::Cancelled), 0, "Cancelled 已取消，應該回傳 0");
}
