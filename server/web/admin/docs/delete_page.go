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

func DeletePage(c *types.Client, data map[string]any) types.Response {
	deletePagesData := utils.ConvertType[docs.DeleteDocsPageAdmin](data)
	validationError := validator.GetValidator().Struct(deletePagesData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	account := session.FetchAccountFromSession(deletePagesData.Token, c)
	if account == nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}
	if !account.Admin {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}

	var documentations []models.Documentation
	err := db.GetDB().Model(&models.Documentation{}).Where("category = ? and `key` = ?", deletePagesData.Category, deletePagesData.Key).Limit(1).Find(&documentations).Error
	if err != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 403, "message": fmt.Sprintf("An error has occured while trying to insert the user in the database. Error: %+v", err)}}}
	}

	if len(documentations) <= 0 {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 404, "message": "Unknown page."}}}
	}

	err = db.GetDB().Delete(&documentations[0]).Error
	if err != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 403, "message": fmt.Sprintf("An error has occured while trying to insert the user in the database. Error: %+v", err)}}}
	}

	return types.Response{Broadcast: false, Data: map[string]any{"event": "delete-docs-page", "data": map[string]any{"status": 200, "message": "The page has been succesfully deleted."}}}
}
