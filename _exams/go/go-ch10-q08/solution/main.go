package main

import (
	"context"
	"errors"
	"fmt"
)

func main() {
	parent, cancel := context.WithCancelCause(context.Background())
	defer cancel(nil)
	child, cancelChild := context.WithCancel(parent)
	defer cancelChild()

	fmt.Println("取消前:", context.Cause(child))
	cancel(errors.New("訂單已被刪除"))
	cancel(errors.New("第二次取消"))
	fmt.Println("Err:", child.Err())
	fmt.Println("Cause:", context.Cause(child))
}
