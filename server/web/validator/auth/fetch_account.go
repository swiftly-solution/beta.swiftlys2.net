package auth

type FetchAccountPayload struct {
	Token string `json:"token" validator:"required,min=8"`
}
