package main

import (
	"reflect"
	"testing"
	"unsafe"
)

func TestEventLayout(t *testing.T) {
	want := map[string]string{"Urgent": "bool", "ID": "int64", "Done": "bool", "Code": "int32"}
	typ := reflect.TypeFor[Event]()
	got := map[string]string{}
	for i := range typ.NumField() {
		got[typ.Field(i).Name] = typ.Field(i).Type.String()
	}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("Event 的欄位 = %v, want %v（只能調整順序）", got, want)
	}
	if got := unsafe.Sizeof(Event{}); got != 16 {
		t.Errorf("unsafe.Sizeof(Event{}) = %d, want 16", got)
	}
}
