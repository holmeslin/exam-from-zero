package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func post(s *Store, body string) *httptest.ResponseRecorder {
	req := httptest.NewRequest("POST", "/items", strings.NewReader(body))
	rec := httptest.NewRecorder()
	s.Create(rec, req)
	return rec
}

func TestCreateOK(t *testing.T) {
	s := NewStore()
	for i, in := range []Item{{Name: "珍珠奶茶", Price: 60}, {Name: "雞排", Price: 85}} {
		body, _ := json.Marshal(map[string]any{"name": in.Name, "price": in.Price})
		rec := post(s, string(body))
		if rec.Code != http.StatusCreated {
			t.Fatalf("新增 %s 的狀態碼 = %d，想要 201", in.Name, rec.Code)
		}
		if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
			t.Errorf("Content-Type = %q，想要 %q", ct, "application/json")
		}
		var got Item
		if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
			t.Fatalf("回應不是 JSON：%q（%v）", rec.Body.String(), err)
		}
		want := Item{ID: i + 1, Name: in.Name, Price: in.Price}
		if got != want {
			t.Errorf("回應 = %+v，想要 %+v", got, want)
		}
		if s.items[want.ID] != want {
			t.Errorf("items[%d] = %+v，想要 %+v", want.ID, s.items[want.ID], want)
		}
	}
}

func TestCreateBad(t *testing.T) {
	for _, body := range []string{`{"name":`, `{"name":"","price":10}`, `{"name":"雞排","price":-1}`} {
		s := NewStore()
		rec := post(s, body)
		if rec.Code != http.StatusBadRequest {
			t.Errorf("送出 %s 的狀態碼 = %d，想要 400", body, rec.Code)
		}
		if len(s.items) != 0 {
			t.Errorf("送出 %s 後 items 有 %d 筆，錯誤的資料不該存進去", body, len(s.items))
		}
	}
}

func TestCreateTooLarge(t *testing.T) {
	s := NewStore()
	body := `{"name":"` + strings.Repeat("a", 2<<20) + `","price":1}`
	rec := post(s, body)
	if rec.Code != http.StatusBadRequest {
		t.Errorf("送出超過 1 MB 的內容，狀態碼 = %d，想要 400（記得用 http.MaxBytesReader）", rec.Code)
	}
}
