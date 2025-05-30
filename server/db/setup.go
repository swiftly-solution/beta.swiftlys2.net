package db

import (
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB = nil

func SetupDB() {
	var err error = nil
	db, err = gorm.Open(mysql.Open(os.Getenv("MYSQL_CONN")), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	sqlx, err := db.DB()
	if err != nil {
		panic(err)
	}

	sqlx.SetConnMaxLifetime(0)
}

func GetDB() *gorm.DB {
	return db
}
