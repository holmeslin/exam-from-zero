package main

import (
	"errors"
	"fmt"
	"testing"
)

func TestBuy(t *testing.T) {
	stock := map[string]int{"蘋果": 1, "香蕉": 0}

	if err := Buy(stock, "蘋果"); err != nil {
		t.Errorf("Buy(蘋果) = %v, want <nil>", err)
	}
	if stock["蘋果"] != 0 {
		t.Errorf("買完蘋果後庫存 = %d, want 0", stock["蘋果"])
	}

	err := Buy(stock, "香蕉")
	if !errors.Is(err, ErrOutOfStock) {
		t.Errorf("Buy(香蕉) = %v，errors.Is(err, ErrOutOfStock) 應該是 true", err)
	} else if err.Error() != "購買 香蕉：庫存不足" {
		t.Errorf("Buy(香蕉) 訊息 = %q, want %q", err.Error(), "購買 香蕉：庫存不足")
	}

	err = Buy(stock, "西瓜")
	if !errors.Is(err, ErrNotFound) {
		t.Errorf("Buy(西瓜) = %v，errors.Is(err, ErrNotFound) 應該是 true", err)
	} else if err.Error() != "購買 西瓜：找不到商品" {
		t.Errorf("Buy(西瓜) 訊息 = %q, want %q", err.Error(), "購買 西瓜：找不到商品")
	}
	if _, ok := stock["西瓜"]; ok {
		t.Errorf("買不存在的商品不應該在 stock 裡新增西瓜")
	}
}

func TestAdvice(t *testing.T) {
	cases := []struct {
		err  error
		want string
	}{
		{nil, "購買成功"},
		{ErrNotFound, "要不要看看別的？"},
		{fmt.Errorf("結帳失敗：%w", fmt.Errorf("購買 西瓜：%w", ErrNotFound)), "要不要看看別的？"},
		{fmt.Errorf("購買 香蕉：%w", ErrOutOfStock), "請等補貨"},
		{errors.New("網路斷線"), "發生未知錯誤"},
	}
	for _, c := range cases {
		if got := Advice(c.err); got != c.want {
			t.Errorf("Advice(%v) = %q, want %q", c.err, got, c.want)
		}
	}
}
