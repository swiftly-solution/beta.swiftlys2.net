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
)

func SavePage(c *types.Client, data map[string]any) types.Response {
	savePagesData := utils.ConvertType[docs.SaveDocsPageAdmin](data)
	validationError := validator.GetValidator().Struct(savePagesData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "save-docs-page", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	account := session.FetchAccountFromSession(savePagesData.Token, c)
	if account == nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "save-docs-page", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}
	if !account.Admin {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "save-docs-page", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}

	err := db.GetDB().Model(&models.Documentation{}).Where("category = ? and `key` = ?", savePagesData.Category, savePagesData.Key).Limit(1).Update("content", savePagesData.Content).Error
	if err != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "save-docs-page", "data": map[string]any{"status": 403, "message": fmt.Sprintf("An error has occured while trying to insert the user in the database. Error: %+v", err)}}}
	}

	return types.Response{Broadcast: false, Data: map[string]any{"event": "save-docs-page", "data": map[string]any{"status": 200, "message": "The page has been succesfully saved."}}}
}
