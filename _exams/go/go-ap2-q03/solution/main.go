package main

import "sync"

var initCount int

func loadConfig() map[string]string {
	initCount++
	return map[string]string{"env": "prod"}
}

var (
	config map[string]string
	once   sync.Once
)

func GetConfig() map[string]string {
	once.Do(func() {
		config = loadConfig()
	})
	return config
}

func main() {}
