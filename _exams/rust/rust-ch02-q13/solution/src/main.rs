fn print_ticket(name: &str, from: &str, to: &str) {
    println!("乘客：{}", name);
    println!("出發：{}", from);
    println!("抵達：{}", to);
}

fn main() {
    let route = "TPE-TNN";
    let from = &route[0..3];
    let to = &route[4..7];

    print_ticket("Andy", from, to);
    print_ticket("小明", from, to);
}
