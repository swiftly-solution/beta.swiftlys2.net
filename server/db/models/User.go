package models

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Username  string         `gorm:"unique" json:"username"`
	Email     string         `gorm:"unique" json:"email"`
	Password  sql.NullString `json:"-"`
	Admin     bool           `gorm:"default:false" json:"admin"`
	OtpActive bool           `gorm:"default:false;column:otpActive" json:"otp_active"`
	OtpToken  sql.NullString `gorm:"column:otpToken" json:"-"`
	Sessions  []Session      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"-"`
}
