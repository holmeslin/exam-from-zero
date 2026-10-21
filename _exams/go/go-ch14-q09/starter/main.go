package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"
)

type Weather struct {
	City string `json:"city"`
	Temp int    `json:"temp"`
}

// FetchWeather 向 baseURL + "/weather/" + city 送出 GET 請求，並把回應的 JSON 解碼成 Weather。
//   - 用 http.NewRequestWithContext 建立請求，讓 ctx 能中止它
//   - 用 client.Do 送出，拿到 resp 後記得 defer resp.Body.Close()
//   - 狀態碼不是 200 時回傳錯誤，錯誤訊息要包含 resp.Status（例如 "404 Not Found"）
func FetchWeather(ctx context.Context, client *http.Client, baseURL, city string) (Weather, error) {
	// TODO
	return Weather{}, errors.New("還沒實作")
}

func main() {
	client := &http.Client{Timeout: 10 * time.Second}
	_, err := FetchWeather(context.Background(), client, "http://localhost:8080", "taipei")
	fmt.Println(err)
}
