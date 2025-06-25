package types

type JWTSession struct {
	ID    uint   `json:"id"`
	Token string `json:"token"`
}
