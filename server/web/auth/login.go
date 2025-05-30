package auth

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/auth"

	"golang.org/x/crypto/bcrypt"
)

func LoginUser(c *types.Client, data map[string]any) types.Response {
	loginData := utils.ConvertType[auth.LoginPayload](data)
	validationError := validator.GetValidator().Struct(loginData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	var user models.User
	err := db.GetDB().Model(&models.User{}).Where("email = ?", loginData.Email).First(&user).Error
	if err != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 404, "message": "There is no account linked to this email."}}}
	}

	if !VerifyPassword(user.Password.String, loginData.Password) {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-login", "data": map[string]any{"status": 403, "message": "Incorrect password."}}}
	}

	// Create session and redirect to profile
	return types.Response{Broadcast: false, Data: map[string]any{"status": 403, "message": "You've succesfully logged in. Please wait..."}}
}

func VerifyPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
