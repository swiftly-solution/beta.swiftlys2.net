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

func FetchNavbar(c *types.Client, data map[string]any) types.Response {
	navbarData := utils.ConvertType[docs.DocsNavbarPayload](data)
	validationError := validator.GetValidator().Struct(navbarData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-documentation-navigation", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	var documentations []models.Documentation
	err := db.GetDB().Model(&models.Documentation{}).Where("category = ?", navbarData.Category).Find(&documentations).Error
	if err != nil {
		log.Println(err)
	}

	return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-documentation-navigation", "data": map[string]any{"status": 200, "data": documentations}}}
}
