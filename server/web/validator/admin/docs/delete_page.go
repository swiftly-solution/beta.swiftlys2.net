package docs

type DeleteDocsPageAdmin struct {
	Key      string `json:"key" validator:"required"`
	Category string `json:"category" validator:"required"`
	Token    string `json:"token" validator:"required"`
}
