package docs

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/docs"
	"log"
)

func FetchPage(c *types.Client, data map[string]any) types.Response {
	pageData := utils.ConvertType[docs.DocsPagePayload](data)
	validationError := validator.GetValidator().Struct(pageData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-documentation", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	var documentations []models.Documentation
	err := db.GetDB().Model(&models.Documentation{}).Where("category = ? and `key` = ?", pageData.Category, pageData.Pagekey).Limit(1).Find(&documentations).Error
	if err != nil {
		log.Println(err)
	}

	if len(documentations) <= 0 {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-documentation", "data": map[string]any{"status": 404, "data": nil}}}
	} else {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-documentation", "data": map[string]any{"status": 200, "data": documentations[0]}}}
	}
}
