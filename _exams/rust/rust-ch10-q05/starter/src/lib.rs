pub trait Polygon {
    const SIDES: u32;
    const NAME: &'static str = "多邊形";

    fn angle_sum() -> u32 {
        todo!()
    }
}

pub struct Triangle;
pub struct Square;
pub struct Hexagon;

impl Polygon for Triangle {
    const SIDES: u32 = 0;
}

impl Polygon for Square {
    const SIDES: u32 = 0;
}

impl Polygon for Hexagon {
    const SIDES: u32 = 0;
}
