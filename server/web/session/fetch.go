package session

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"fmt"
	"log"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func ParseSessionData(token string) *types.JWTSession {
	tk, err := jwt.ParseWithClaims(token, &jwt.RegisteredClaims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(os.Getenv("AUTH_SIGNING_KEY")), nil
	})

	if err != nil {
		return nil
	}

	if claims, ok := tk.Claims.(*jwt.RegisteredClaims); ok && tk.Valid {
		if claims.Issuer != "SwiftlyS2" {
			return nil
		}

		data := utils.FromJson[types.JWTSession](claims.Subject)
		return &data
	} else {
		return nil
	}
}

func FetchAccountFromSession(token string, c *types.Client) *models.User {
	jwtSession := ParseSessionData(token)
	if jwtSession == nil {
		return nil
	}

	var sessions []models.Session
	err := db.GetDB().Model(&models.Session{}).Where("user_id = ? and token = ? and (UNIX_TIMESTAMP() - created_at <= 86400)", jwtSession.ID, jwtSession.Token).Limit(1).Find(&sessions).Error
	if err != nil {
		log.Println(err)
		return nil
	}
	if len(sessions) <= 0 {
		return nil
	}

	session := sessions[0]
	if session.IP != c.IP {
		return nil
	}

	var users []models.User
	err = db.GetDB().Model(&models.User{}).Where("id = ?", session.UserID).Limit(1).Find(&users).Error
	if err != nil {
		log.Println(err)
		return nil
	}

	return &users[0]
}
