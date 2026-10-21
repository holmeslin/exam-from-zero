use std::path::{Path, PathBuf};
use rust_ch11_q09::{backup_path, ext_lower};

#[test]
fn hidden_backup_path() {
    assert_eq!(backup_path(Path::new("/home/user/notes.txt")),
        Some(PathBuf::from("/home/user/backup/notes.txt")), "絕對路徑的備份位置不對");
    assert_eq!(backup_path(Path::new("notes.txt")),
        Some(PathBuf::from("backup/notes.txt")), "只有檔名時，上層是空路徑，結果應該是 backup/notes.txt");
    assert_eq!(backup_path(Path::new("/")), None, "\"/\" 沒有檔名，應該回傳 None");
}

#[test]
fn hidden_ext_lower() {
    assert_eq!(ext_lower(Path::new("/tmp/photo.JPG")), Some(String::from("jpg")), "副檔名要轉小寫");
    assert_eq!(ext_lower(Path::new("archive.tar.Gz")), Some(String::from("gz")), "只取最後一段副檔名");
    assert_eq!(ext_lower(Path::new("README")), None, "沒有副檔名應該回傳 None");
}
