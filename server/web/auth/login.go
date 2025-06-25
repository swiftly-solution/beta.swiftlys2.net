package auth

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/session"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/auth"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func LoginUser(c *types.Client, data map[string]any) types.Response {
	loginData := utils.ConvertType[auth.LoginPayload](data)
	validationError := validator.GetValidator().Struct(loginData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	var users []models.User
	err := db.GetDB().Model(&models.User{}).Where("email = ?", loginData.Email).Limit(1).Find(&users).Error
	if err != nil {
		log.Println(err)
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 500, "message": "An error has occured while trying to login."}}}
	}
	if len(users) <= 0 {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 404, "message": "There is no account linked to this email."}}}
	}

	if !VerifyPassword(users[0].Password.String, loginData.Password) {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 403, "message": "Incorrect password."}}}
	}

	session := session.CreateSession(c, users[0])

	return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 200, "message": "You've succesfully logged in. Please wait...", "user": users[0], "session": session}}}
}

func VerifyPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
