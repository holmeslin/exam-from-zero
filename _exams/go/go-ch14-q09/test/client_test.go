package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func newWeatherServer() *httptest.Server {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /weather/taipei", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, `{"city":"台北","temp":31}`)
	})
	return httptest.NewServer(mux)
}

func TestFetchWeather(t *testing.T) {
	srv := newWeatherServer()
	defer srv.Close()
	client := &http.Client{Timeout: 2 * time.Second}

	w, err := FetchWeather(context.Background(), client, srv.URL, "taipei")
	if err != nil {
		t.Fatalf("taipei 應該成功，卻得到錯誤：%v", err)
	}
	if w != (Weather{City: "台北", Temp: 31}) {
		t.Errorf("taipei 的結果 = %+v，想要 {City:台北 Temp:31}", w)
	}

	_, err = FetchWeather(context.Background(), client, srv.URL, "tokyo")
	if err == nil {
		t.Fatal("tokyo 回 404，應該回傳錯誤（client.Do 不會因為 404 回錯誤，要自己檢查 resp.StatusCode）")
	}
	if !strings.Contains(err.Error(), "404 Not Found") {
		t.Errorf("錯誤訊息 = %q，應該包含 %q", err.Error(), "404 Not Found")
	}
}

func TestFetchWeatherUsesContext(t *testing.T) {
	srv := newWeatherServer()
	defer srv.Close()
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	_, err := FetchWeather(ctx, &http.Client{Timeout: 2 * time.Second}, srv.URL, "taipei")
	if err == nil {
		t.Error("ctx 已經取消，請求應該失敗；請用 http.NewRequestWithContext 建立請求")
	}
}
