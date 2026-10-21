package main

import (
	"errors"
	"fmt"
	"testing"
)

func TestValidationErrorMessage(t *testing.T) {
	var err error = &ValidationError{Field: "age", Value: 200}
	want := "欄位 age 的值 200 不合法"
	if err.Error() != want {
		t.Errorf("Error() = %q, want %q", err.Error(), want)
	}
}

func TestBadField(t *testing.T) {
	cases := []struct {
		name  string
		err   error
		field string
		ok    bool
	}{
		{"沒包裝", &ValidationError{Field: "age", Value: -3}, "age", true},
		{"包了兩層", fmt.Errorf("註冊 小美：%w", fmt.Errorf("檢查：%w", &ValidationError{Field: "score", Value: 999})), "score", true},
		{"用 errors.Join 合併", errors.Join(errors.New("名字不能空白"), &ValidationError{Field: "height", Value: 0}), "height", true},
		{"一般錯誤", errors.New("網路斷線"), "", false},
		{"nil", nil, "", false},
	}
	for _, c := range cases {
		field, ok := BadField(c.err)
		if field != c.field || ok != c.ok {
			t.Errorf("%s：BadField(%v) = %q, %v, want %q, %v", c.name, c.err, field, ok, c.field, c.ok)
		}
	}
}
