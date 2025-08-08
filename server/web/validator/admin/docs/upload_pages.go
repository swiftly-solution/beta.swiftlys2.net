package docs

type PageContent struct {
	Page  string `json:"page"`
	Title string `json:"title"`
	Icon  string `json:"icon,omitempty"`
}

type UploadDocsPageAdmin struct {
	Content  string `json:"content" validator:"required"`
	Category string `json:"category" validator:"required"`
	Token    string `json:"token" validator:"required"`
}
