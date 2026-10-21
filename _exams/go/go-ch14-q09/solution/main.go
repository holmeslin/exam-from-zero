package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Weather struct {
	City string `json:"city"`
	Temp int    `json:"temp"`
}

func FetchWeather(ctx context.Context, client *http.Client, baseURL, city string) (Weather, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, baseURL+"/weather/"+city, nil)
	if err != nil {
		return Weather{}, err
	}
	resp, err := client.Do(req)
	if err != nil {
		return Weather{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return Weather{}, fmt.Errorf("伺服器回應 %s", resp.Status)
	}
	var w Weather
	if err := json.NewDecoder(resp.Body).Decode(&w); err != nil {
		return Weather{}, err
	}
	return w, nil
}

func main() {
	client := &http.Client{Timeout: 10 * time.Second}
	_, err := FetchWeather(context.Background(), client, "http://localhost:8080", "taipei")
	fmt.Println(err)
}
