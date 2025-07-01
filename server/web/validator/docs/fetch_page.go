package docs

type DocsPagePayload struct {
	Category string `json:"category" validator:"required"`
	Pagekey  string `json:"pagekey" validator:"required"`
}
