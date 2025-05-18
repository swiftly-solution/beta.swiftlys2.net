package models

import "time"

type ForgotPassword struct {
	ID        uint   `gorm:"primarykey"`
	UUID      string `gorm:"unique"`
	Email     string
	Timestamp time.Time
	Used      bool `gorm:"default:false"`
}
