fn main() {
    let age = 16;
    let with_parent = true;
    let has_ticket = true;

    if has_ticket && (age >= 18 || with_parent) {
        println!("可以入場");
    } else {
        println!("不能入場");
    }
}
