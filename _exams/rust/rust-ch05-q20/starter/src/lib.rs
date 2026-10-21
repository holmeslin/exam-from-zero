// 版本號：先比 major，再比 minor，最後比 patch
pub struct Version {
    pub patch: u32,
    pub minor: u32,
    pub major: u32,
}
