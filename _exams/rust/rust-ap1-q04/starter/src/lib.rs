/// 找出第一組 i < j 且 nums[i] + nums[j] == target 的索引 (i, j)；找不到回傳 None。
/// 「第一組」的意思是 i 最小；i 相同時 j 最小。
pub fn find_pair(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let found = 'search: {
        // 用兩層 for 搜尋，找到就 break 'search 帶出結果
        None
    };
    found
}
