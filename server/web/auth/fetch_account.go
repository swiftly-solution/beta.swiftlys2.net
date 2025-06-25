package auth

import (
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/utils"
	"beta-swiftlys2-net/web/session"
	"beta-swiftlys2-net/web/validator"
	"beta-swiftlys2-net/web/validator/auth"
)

func FetchAccount(c *types.Client, data map[string]any) types.Response {
	fetchAccountData := utils.ConvertType[auth.FetchAccountPayload](data)
	validationError := validator.GetValidator().Struct(fetchAccountData)
	if validationError != nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-account", "data": map[string]any{"status": 403, "message": validator.ProcessErrors(validationError)}}}
	}

	user := session.FetchAccountFromSession(fetchAccountData.Token, c)
	if user == nil {
		return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-account", "data": map[string]any{"status": 404}}}
	}

	return types.Response{Broadcast: false, Data: map[string]any{"event": "fetch-account", "data": map[string]any{"status": 200, "data": user}}}
}
