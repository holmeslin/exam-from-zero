pub trait Polygon {
    const SIDES: u32;
    const NAME: &'static str = "多邊形";

    fn angle_sum() -> u32 {
        (Self::SIDES - 2) * 180
    }
}

pub struct Triangle;
pub struct Square;
pub struct Hexagon;

impl Polygon for Triangle {
    const SIDES: u32 = 3;
    const NAME: &'static str = "三角形";
}

impl Polygon for Square {
    const SIDES: u32 = 4;
    const NAME: &'static str = "正方形";
}

impl Polygon for Hexagon {
    const SIDES: u32 = 6;
}
