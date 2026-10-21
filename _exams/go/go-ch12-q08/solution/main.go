package main

import "time"

// ToTaipei 把 "2006-01-02 15:04:05" 格式的 UTC 時間字串，
// 換成台北時間（UTC+8），並格式化成 "2006/01/02 15:04" 的樣子。
// 字串格式不對時回傳錯誤。
func ToTaipei(s string) (string, error) {
	t, err := time.Parse(time.DateTime, s)
	if err != nil {
		return "", err
	}
	taipei := time.FixedZone("UTC+8", 8*60*60)
	return t.In(taipei).Format("2006/01/02 15:04"), nil
}

// Overtime 回傳從 start 到 end 的工作時間超過 8 小時的部分；沒超過就回傳 0。
func Overtime(start, end time.Time) time.Duration {
	work := end.Sub(start)
	if work <= 8*time.Hour {
		return 0
	}
	return work - 8*time.Hour
}

func main() {}
