package db

import "beta-swiftlys2-net/models"

func LoadModels() {
	GetDB().AutoMigrate(&models.User{})
	GetDB().AutoMigrate(&models.Session{})
	GetDB().AutoMigrate(&models.ForgotPassword{})
}
