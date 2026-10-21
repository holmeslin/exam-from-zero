use rust_ap2_q02::{Builder, FormatterLike, write_two_parts};

#[test]
fn builder_borrows_briefly() {
    let mut output = String::new();
    {
        let mut formatter = FormatterLike {
            output: &mut output,
        };
        write_two_parts(&mut formatter);
        let mut tail = Builder::new(&mut formatter);
        tail.field("！");
    }
    assert_eq!(output, "第一段 第二段！", "輸出內容不對");
}
