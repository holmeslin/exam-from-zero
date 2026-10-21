use rust_ch07_q10::{Describe, Scores};

#[test]
fn hidden_scores_display() {
    let s = Scores(vec![85, 92, 78]);
    assert_eq!(s.to_string(), "[85, 92, 78]，總分 255", "Scores 的 Display 格式不對");
    assert_eq!(Scores(vec![]).to_string(), "[]，總分 0", "空的 Scores 應該印出 []，總分 0");
}

#[test]
fn hidden_vec_describe() {
    assert_eq!(vec![1, 2, 3].describe(), "有 3 個元素", "vec![1, 2, 3].describe() 不對");
    assert_eq!(Vec::<i32>::new().describe(), "有 0 個元素", "空 Vec 的 describe() 不對");
}
