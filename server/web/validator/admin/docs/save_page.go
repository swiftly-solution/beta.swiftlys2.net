package docs

type SaveDocsPageAdmin struct {
	Key      string `json:"key" validator:"required"`
	Category string `json:"category" validator:"required"`
	Content  string `json:"content" validator:"required"`
	Token    string `json:"token" validator:"required"`
}
