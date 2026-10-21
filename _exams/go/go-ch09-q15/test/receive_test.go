package main

import (
	"testing"
	"testing/synctest"
	"time"
)

func TestReceiveTimeout(t *testing.T) {
	synctest.Test(t, func(t *testing.T) {
		ch := make(chan int)
		start := time.Now()
		v, ok := Receive(ch, 10*time.Second)
		if ok || v != 0 {
			t.Errorf("沒有人傳送時 Receive() = %d, %t，想要 0, false", v, ok)
		}
		if waited := time.Since(start); waited != 10*time.Second {
			t.Errorf("Receive(ch, 10s) 等了 %v 才回傳，想要剛好等 10s", waited)
		}
	})
}

func TestReceiveValue(t *testing.T) {
	synctest.Test(t, func(t *testing.T) {
		ch := make(chan int, 1) // 有 1 格暫存，就算 Receive 沒接收，送的 goroutine 也能結束
		go func() {
			time.Sleep(3 * time.Second)
			ch <- 42
		}()
		start := time.Now()
		v, ok := Receive(ch, 10*time.Second)
		if !ok || v != 42 {
			t.Errorf("3 秒後有人送 42，Receive(ch, 10s) = %d, %t，想要 42, true", v, ok)
		}
		if waited := time.Since(start); waited != 3*time.Second {
			t.Errorf("Receive 等了 %v 才回傳，想要收到值就馬上回傳（3s）", waited)
		}
		time.Sleep(5 * time.Second) // 假時鐘往前跳，讓送值的 goroutine 一定能結束
	})
}
