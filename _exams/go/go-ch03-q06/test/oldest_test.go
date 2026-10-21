package main

import "testing"

func TestOldest(t *testing.T) {
	people := []Person{
		{Name: "Andy", Age: 20},
		{Name: "Betty", Age: 35},
		{Name: "Cindy", Age: 35},
		{Name: "David", Age: 18},
	}
	got := Oldest(people)
	if got == nil {
		t.Fatalf("Oldest(4 個人) = nil, want 指向 Betty 的指標")
	}
	if got != &people[1] {
		t.Fatalf("Oldest 回傳的是 %+v，但它不是指向 people[1]（Betty）的指標；要回傳切片元素的位址 &people[i]，而不是複本的位址", *got)
	}
	got.Age++
	if people[1].Age != 36 {
		t.Errorf("透過回傳的指標把 Age 加 1 後，people[1].Age = %d, want 36", people[1].Age)
	}
	if got := Oldest(nil); got != nil {
		t.Errorf("Oldest(nil) = %+v, want nil", *got)
	}
}
