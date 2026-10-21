use rust_ch05_q21::{total, Container, Scores};

struct HiddenFixed {
    values: [i32; 3],
}

impl Container for HiddenFixed {
    type Item = i32;

    fn get(&self, index: usize) -> Option<&i32> {
        if index < 3 { Some(&self.values[index]) } else { None }
    }

    fn size(&self) -> usize {
        3
    }
}

#[test]
fn hidden_scores_methods() {
    let s = Scores { data: vec![3, 4, 5] };
    assert_eq!(s.size(), 3, "size 應該是 3");
    assert_eq!(s.get(1), Some(&4), "get(1) 應該是 Some(&4)");
    assert_eq!(s.get(9), None, "超出範圍要回傳 None");
    assert_eq!(s.first(), Some(&3), "first 應該是 Some(&3)");
    let empty = Scores { data: vec![] };
    assert_eq!(empty.first(), None, "空的 Scores，first 是 None");
}

#[test]
fn hidden_total_is_generic() {
    assert_eq!(total(&Scores { data: vec![3, 4, 5] }), 12, "3 + 4 + 5 = 12");
    assert_eq!(total(&Scores { data: vec![] }), 0, "空的加總是 0");
    assert_eq!(total(&HiddenFixed { values: [10, -2, 7] }), 15, "total 要能用在其他 Item = i32 的 Container 上");
    assert_eq!(HiddenFixed { values: [8, 0, 0] }.first(), Some(&8), "其他型別也要能用預設的 first");
}
