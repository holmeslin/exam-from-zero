use std::fmt::Display;
use std::fmt::Formatter;

pub struct Point {
    pub x: i32,
    pub y: i32,
}

impl Display for Point {
    fn fmt(&self, f: &mut Formatter) -> std::fmt::Result {
        todo!()
    }
}
