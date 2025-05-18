package main

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/ws"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")

	db.SetupDB()

	db.LoadModels()

	ws.SetupWebServices()
}
