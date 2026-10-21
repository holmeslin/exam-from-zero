use rust_ch05_q12::{from_slice, len, sum, List};

#[test]
fn hidden_sum_and_len() {
    let list = List::Node(3, Box::new(List::Node(4, Box::new(List::Empty))));
    assert_eq!(sum(&list), 7, "3 -> 4 -> Empty 的總和是 7");
    assert_eq!(len(&list), 2, "3 -> 4 -> Empty 有 2 個 Node");
    assert_eq!(sum(&List::Empty), 0, "空串列總和是 0");
    assert_eq!(len(&List::Empty), 0, "空串列長度是 0");
}

#[test]
fn hidden_from_slice_keeps_order() {
    let list = from_slice(&[1, 2, 3]);
    assert_eq!(len(&list), 3, "from_slice(&[1, 2, 3]) 應該有 3 個 Node");
    assert_eq!(sum(&list), 6, "from_slice(&[1, 2, 3]) 總和是 6");
    match list {
        List::Node(first, rest) => {
            assert_eq!(first, 1, "第一個 Node 應該是 1（順序要和切片一樣）");
            match *rest {
                List::Node(second, _) => assert_eq!(second, 2, "第二個 Node 應該是 2"),
                List::Empty => panic!("第二個位置不該是 Empty"),
            }
        }
        List::Empty => panic!("from_slice(&[1, 2, 3]) 不該是 Empty"),
    }
    assert_eq!(len(&from_slice(&[])), 0, "from_slice(&[]) 應該是 Empty");
}
