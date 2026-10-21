package main

import (
	"encoding/json"
	"testing"
)

func TestProductJSON(t *testing.T) {
	cases := []struct {
		p    Product
		want string
	}{
		{Product{Name: "Pen", Price: 30}, `{"name":"Pen","price":30}`},
		{Product{Name: "Ink", Price: 0}, `{"name":"Ink","price":0}`},
		{Product{Name: "Cup", Price: 120, Note: "易碎", Maker: Maker{Country: "TW"}},
			`{"name":"Cup","price":120,"note":"易碎","maker":{"country":"TW"}}`},
	}
	for _, c := range cases {
		data, err := json.Marshal(c.p)
		if err != nil {
			t.Fatalf("json.Marshal 失敗: %v", err)
		}
		if got := string(data); got != c.want {
			t.Errorf("json.Marshal(%+v)\n got: %s\nwant: %s", c.p, got, c.want)
		}
	}
}
