package main

import (
	"errors"
	"testing"
)

func TestValidateAllBad(t *testing.T) {
	err := Validate("", 200)
	if !errors.Is(err, ErrEmptyName) || !errors.Is(err, ErrBadAge) {
		t.Fatalf("Validate(\"\", 200) = %v，應該同時包含 ErrEmptyName 和 ErrBadAge", err)
	}
	want := "名字不能空白\n年齡要在 0 到 150 之間"
	if err.Error() != want {
		t.Errorf("訊息 = %q, want %q（名字的錯誤在前）", err.Error(), want)
	}
}

func TestValidateOne(t *testing.T) {
	err := Validate("Andy", -1)
	if !errors.Is(err, ErrBadAge) || errors.Is(err, ErrEmptyName) {
		t.Errorf("Validate(\"Andy\", -1) = %v，應該只有 ErrBadAge", err)
	}
}

func TestValidateOK(t *testing.T) {
	if err := Validate("Andy", 20); err != nil {
		t.Errorf("Validate(\"Andy\", 20) = %v, want <nil>", err)
	}
}
