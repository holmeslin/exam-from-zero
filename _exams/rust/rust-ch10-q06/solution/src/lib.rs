pub fn add_arrays<const N: usize>(a: [i32; N], b: [i32; N]) -> [i32; N] {
    let mut result = [0; N];
    for i in 0..N {
        result[i] = a[i] + b[i];
    }
    result
}

pub fn reversed<const N: usize>(arr: [i32; N]) -> [i32; N] {
    let mut result = [0; N];
    for i in 0..N {
        result[i] = arr[N - 1 - i];
    }
    result
}

pub fn filled<T: Copy, const N: usize>(value: T) -> [T; N] {
    [value; N]
}
