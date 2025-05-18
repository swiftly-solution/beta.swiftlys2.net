package models

import (
	"database/sql"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string `gorm:"unique"`
	Email     string `gorm:"unique"`
	Password  sql.NullString
	Admin     bool           `gorm:"default:false"`
	OtpActive bool           `gorm:"default:false;column:otpActive"`
	OtpToken  sql.NullString `gorm:"column:otpToken"`
	Sessions  []Session      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
