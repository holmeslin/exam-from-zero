pub trait Legs {
    fn legs(self) -> u32;
}

pub struct Bird;
pub struct Dog;

impl Legs for Bird {
    fn legs(self) -> u32 {
        2
    }
}

impl Legs for Dog {
    fn legs(self) -> u32 {
        4
    }
}
