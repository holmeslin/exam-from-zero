#[macro_export]
macro_rules! sum {
    () => {
        0
    };
    ($($x:expr),+) => {
        0 $(+ $x)*
    };
}

#[macro_export]
macro_rules! strings {
    ($($s:expr),*) => {{
        let mut v: Vec<String> = Vec::new();
        $( v.push(String::from($s)); )*
        v
    }};
}
