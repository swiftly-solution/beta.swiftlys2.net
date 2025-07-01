package docs

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/session"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/admin/docs"
	"fmt"
	"log"
)

func CreatePage(c *types.Client, data map[string]any) types.Response {
	createPagesData := utils.ConvertType[docs.CreateDocsPageAdmin](data)
	validationError := validator.GetValidator().Struct(createPagesData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	account := session.FetchAccountFromSession(createPagesData.Token, c)
	if account == nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}
	if !account.Admin {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}

	var count int64
	err := db.GetDB().Model(&models.Documentation{}).Where("category = ? AND `key` = ?", createPagesData.Category, createPagesData.Key).Count(&count).Error
	if err != nil {
		log.Println(err)
		return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 500, "message": "An error has occured while trying to sign up."}}}
	}
	if count > 0 {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 403, "message": "There is already a page with this key and category."}}}
	}

	page := models.Documentation{
		Key:      createPagesData.Key,
		Title:    createPagesData.Title,
		Icon:     createPagesData.Icon,
		Content:  "",
		Category: createPagesData.Category,
	}

	result := db.GetDB().Create(&page)
	if result.Error != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 403, "message": fmt.Sprintf("An error has occured while trying to insert the user in the database. Error: %+v", result.Error)}}}
	}

	return types.Response{Broadcast: false, Data: map[string]any{"event": "create-docs-page", "data": map[string]any{"status": 200, "message": "You've succesfully created the documentation page."}}}
}
