package session

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func CreateSession(c *types.Client, user models.User) string {
	uniqueToken := utils.RandomString(128)

	session := models.Session{
		Token:     uniqueToken,
		UserID:    int(user.ID),
		IP:        c.IP,
		OTPLogged: false,
	}

	result := db.GetDB().Create(&session)
	if result.Error != nil {
		return ""
	}

	sessionData := types.JWTSession{
		ID:    user.ID,
		Token: uniqueToken,
	}

	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
		Issuer:    "SwiftlyS2",
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Subject:   utils.ToJson(sessionData),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(os.Getenv("AUTH_SIGNING_KEY")))
	if err != nil {
		fmt.Println(err)
		return ""
	}

	return tokenString
}
