use std::path::{Path, PathBuf};

/// 在同一個資料夾底下的 backup 子資料夾放一份同名檔案，回傳那個路徑。
/// 例如 /home/user/notes.txt → /home/user/backup/notes.txt。
/// 路徑沒有檔名（例如 "/"）時回傳 None。
pub fn backup_path(path: &Path) -> Option<PathBuf> {
    let name = path.file_name()?;
    let parent = path.parent()?;
    Some(parent.join("backup").join(name))
}

/// 回傳小寫的副檔名，例如 photo.JPG → Some("jpg")；沒有副檔名回傳 None。
pub fn ext_lower(path: &Path) -> Option<String> {
    let ext = path.extension()?;
    Some(ext.to_str()?.to_lowercase())
}
