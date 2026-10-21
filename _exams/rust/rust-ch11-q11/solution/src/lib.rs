use std::io::{self, BufRead, Write};

/// 逐行讀取 input，略過只有空白的行；其餘每行去掉頭尾空白後，
/// 以「編號: 內容」的格式寫進 out（編號從 1 開始，每行結尾換行）。
/// 回傳寫了幾行。
pub fn number_lines(input: impl BufRead, mut out: impl Write) -> io::Result<usize> {
    let mut count = 0;
    for line in input.lines() {
        let line = line?;
        let text = line.trim();
        if text.is_empty() {
            continue;
        }
        count += 1;
        writeln!(out, "{}: {}", count, text)?;
    }
    Ok(count)
}
