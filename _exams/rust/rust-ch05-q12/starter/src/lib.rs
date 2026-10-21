pub enum List {
    Node(i32, Box<List>),
    Empty,
}

// 依照切片的順序建立串列：&[1, 2, 3] 變成 1 -> 2 -> 3 -> Empty
pub fn from_slice(values: &[i32]) -> List {
    todo!()
}

// 串列裡所有數字的總和
pub fn sum(list: &List) -> i32 {
    todo!()
}

// 串列裡有幾個 Node
pub fn len(list: &List) -> usize {
    todo!()
}
