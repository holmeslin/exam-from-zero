// 讓 crate 外面能用 math::basic::add 和 math::advanced::power
mod math {
    mod basic {
        fn add(a: i32, b: i32) -> i32 {
            a + b
        }
    }

    mod advanced {
        fn power(base: i32, exp: u32) -> i32 {
            todo!()
        }
    }
}
