//! 小小的數學函式庫。

/// 用輾轉相除法計算兩個數的最大公因數。
///
/// # Examples
///
/// ```
/// use my_math_lib::gcd;
///
/// assert_eq!(gcd(12, 8), 2);
/// ```
pub fn gcd(mut a: u64, mut b: u64) -> u64 {
    while b != 0 {
        let temp = b;
        b = a % b;
        a = temp;
    }
    a
}
