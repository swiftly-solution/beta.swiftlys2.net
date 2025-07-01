package models

type Documentation struct {
	ID       uint32 `gorm:"primarykey" json:"id"`
	Key      string `json:"key"`
	Title    string `json:"title"`
	Icon     string `json:"icon"`
	Content  string `json:"content"`
	Category string `json:"category"`
}
