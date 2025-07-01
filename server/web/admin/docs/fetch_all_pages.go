package docs

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/session"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/admin/docs"
	"log"
)

func FetchAllPages(c *types.Client, data map[string]any) types.Response {
	pagesData := utils.ConvertType[docs.FetchAllPagesAdminPayload](data)
	validationError := validator.GetValidator().Struct(pagesData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-all-docs", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	account := session.FetchAccountFromSession(pagesData.Token, c)
	if account == nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-all-docs", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}
	if !account.Admin {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-all-docs", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}

	var documentations []models.Documentation
	err := db.GetDB().Model(&models.Documentation{}).Find(&documentations).Error
	if err != nil {
		log.Println(err)
	}

	return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-all-docs", "data": map[string]any{"status": 200, "data": documentations}}}
}
