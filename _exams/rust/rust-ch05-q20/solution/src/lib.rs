// derive 的 Ord 依欄位宣告順序比較，所以 major 要放第一個
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Default)]
pub struct Version {
    pub major: u32,
    pub minor: u32,
    pub patch: u32,
}
