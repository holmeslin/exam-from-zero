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
            // TODO：用 super:: 呼叫父 mod 的 greet
            String::new()
        }
    }
}

use text::format;
// TODO：用 as 把 money::format 匯入成 money_format

fn main() {
    println!("{}", format());
    println!("{}", format()); // TODO：改成呼叫 money_format()
    println!("{}", outer::inner::call_parent());
}
