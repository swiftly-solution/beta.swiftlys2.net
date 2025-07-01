package docs

type DocsNavbarPayload struct {
	Category string `json:"category" validator:"required"`
}
