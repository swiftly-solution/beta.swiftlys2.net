package docs

import (
	"beta-swiftlys2-net/db"
	"beta-swiftlys2-net/db/models"
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/session"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/admin/docs"
	"sort"
)

func UploadPages(c *types.Client, data map[string]any) types.Response {
	uploadPagesData := utils.ConvertType[docs.UploadDocsPageAdmin](data)
	validationError := validator.GetValidator().Struct(uploadPagesData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "upload-docs-pages", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	account := session.FetchAccountFromSession(uploadPagesData.Token, c)
	if account == nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "upload-docs-pages", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}
	if !account.Admin {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "upload-docs-pages", "data": map[string]any{"status": 403, "message": "Unauthorized."}}}
	}

	allPages := utils.FromJson[map[string]docs.PageContent](uploadPagesData.Content)

	keys := make([]string, 0, len(allPages))
	for k := range allPages {
		keys = append(keys, k)
	}

	sort.Strings(keys)

	var docpages []models.Documentation

	for _, k := range keys {
		v := allPages[k]
		if v.Page == "" {
			continue
		}

		// var documentations []models.Documentation
		// err := db.GetDB().Model(&models.Documentation{}).Where("category = ? and `key` = ?", uploadPagesData.Category, k).Limit(1).Find(&documentations).Error
		// if err != nil {
		// 	continue
		// }

		// if len(documentations) > 0 {
		// 	db.GetDB().Delete(&documentations[0])
		// }

		docpages = append(docpages, models.Documentation{
			Key:      k,
			Title:    v.Title,
			Icon:     v.Icon,
			Content:  v.Page,
			Category: uploadPagesData.Category,
		})
	}
	db.GetDB().Create(&docpages)

	return types.Response{Broadcast: false, Data: map[string]any{"event": "upload-docs-pages", "data": map[string]any{"status": 200, "message": "You've succesfully created the documentation pages."}}}
}
