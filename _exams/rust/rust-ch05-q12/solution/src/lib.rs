pub enum List {
    Node(i32, Box<List>),
    Empty,
}

pub fn from_slice(values: &[i32]) -> List {
    let mut list = List::Empty;
    let mut i = values.len();
    while i > 0 {
        i -= 1;
        list = List::Node(values[i], Box::new(list));
    }
    list
}

pub fn sum(list: &List) -> i32 {
    match list {
        List::Node(value, next) => value + sum(next),
        List::Empty => 0,
    }
}

pub fn len(list: &List) -> usize {
    match list {
        List::Node(_, next) => 1 + len(next),
        List::Empty => 0,
    }
}
