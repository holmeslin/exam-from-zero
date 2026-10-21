pub mod shapes {
    pub mod circle {
        pub struct Circle {
            pub radius: f64,
        }

        impl Circle {
            pub fn new(radius: f64) -> Circle {
                Circle { radius }
            }

            pub fn area(&self) -> f64 {
                std::f64::consts::PI * self.radius * self.radius
            }
        }
    }

    pub mod rectangle {
        pub struct Rectangle {
            pub width: f64,
            pub height: f64,
        }

        impl Rectangle {
            pub fn new(width: f64, height: f64) -> Rectangle {
                Rectangle { width, height }
            }

            pub fn area(&self) -> f64 {
                self.width * self.height
            }
        }
    }

    pub use circle::Circle;
    pub use rectangle::Rectangle;
}

pub use shapes::{Circle, Rectangle};
