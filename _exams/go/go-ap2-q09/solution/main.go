package main

import (
	"io"
	"runtime/pprof"
)

func Profile(w io.Writer, work func()) error {
	if err := pprof.StartCPUProfile(w); err != nil {
		return err
	}
	defer pprof.StopCPUProfile()
	work()
	return nil
}

func main() {}
