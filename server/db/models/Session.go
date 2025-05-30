package models

import "gorm.io/gorm"

type Session struct {
	gorm.Model
	Token     string `gorm:"unique"`
	UserID    int
	User      User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	IP        string
	UserAgent string `gorm:"column:userAgent"`
	OTPLogged bool   `gorm:"column:otpLogged;default:false"`
}
