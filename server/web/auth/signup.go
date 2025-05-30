package auth

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/auth"
	"database/sql"
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func SignupUser(c *types.Client, data map[string]any) types.Response {
	signupData := utils.ConvertType[auth.SignupPayload](data)
	validationError := validator.GetValidator().Struct(signupData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-signup", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	var count int64
	err := db.GetDB().Model(&models.User{}).Where("username = ? OR email = ?", signupData.Username, signupData.Email).Count(&count).Error
	if err != nil {
		log.Println(err)
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-signup", "data": map[string]any{"status": 500, "message": "An error has occured while trying to sign up."}}}
	}
	if count > 0 {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-signup", "data": map[string]any{"status": 403, "message": "There is already an user with this Email address or this username."}}}
	}

	hashed_pass, err := HashPassword(signupData.Password)
	if err != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-signup", "data": map[string]any{"status": 500, "message": "An internal error has occured while trying to save your password."}}}
	}

	user := &models.User{
		Username:  signupData.Username,
		Email:     signupData.Email,
		Password:  sql.NullString{String: hashed_pass, Valid: true},
		Admin:     false,
		OtpActive: false,
		OtpToken:  sql.NullString{Valid: false},
	}

	result := db.GetDB().Create(user)
	if result.Error != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-signup", "data": map[string]any{"status": 403, "message": fmt.Sprintf("An error has occured while trying to insert the user in the database. Error: %+v", result.Error)}}}
	}

	// Create session and redirect to profile
	return types.Response{Broadcast: false, Data: map[string]any{"event": "auth-signup", "data": map[string]any{"status": 200, "message": "You've succesfully signed up. Please wait a second..."}}}
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}
