mod text {
    pub fn format() -> String {
        String::from("text 格式")
    }
}

mod money {
    pub fn format() -> String {
        String::from("money 格式")
    }
}

mod outer {
    pub fn greet() -> String {
        String::from("Hello from outer")
    }

    pub mod inner {
        pub fn call_parent() -> String {
            super::greet()
        }
    }
}

use money::format as money_format;
use text::format;

fn main() {
    println!("{}", format());
    println!("{}", money_format());
    println!("{}", outer::inner::call_parent());
}
