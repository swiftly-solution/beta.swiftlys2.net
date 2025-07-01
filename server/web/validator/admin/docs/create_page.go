package docs

type CreateDocsPageAdmin struct {
	Key      string `json:"key" validator:"required"`
	Title    string `json:"title" validator:"required"`
	Icon     string `json:"icon" validator:"required"`
	Category string `json:"category" validator:"required"`
	Token    string `json:"token" validator:"required"`
}
