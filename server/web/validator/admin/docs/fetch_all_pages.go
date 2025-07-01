package docs

type FetchAllPagesAdminPayload struct {
	Token string `json:"token" validator:"required"`
}
