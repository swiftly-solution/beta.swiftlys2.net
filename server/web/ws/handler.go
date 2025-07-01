package ws

import (
	"beta-swiftlys2-net/types"
	adocs "beta-swiftlys2-net/web/admin/docs"
	"beta-swiftlys2-net/web/auth"
	"beta-swiftlys2-net/web/docs"
	"beta-swiftlys2-net/web/info"
	"encoding/json"
)

func HandleEvent(c *types.Client, msg []byte) types.Response {
	var event types.Event
	if err := json.Unmarshal(msg, &event); err != nil {
		return types.Response{Broadcast: false, Data: map[string]string{"error": "invalid format"}}
	}

	switch event.Type {
	case "auth-login":
		return auth.LoginUser(c, event.Data)
	case "auth-signup":
		return auth.SignupUser(c, event.Data)
	case "fetch-account":
		return auth.FetchAccount(c, event.Data)
	case "fetch-documentation-navigation":
		return docs.FetchNavbar(c, event.Data)
	case "fetch-documentation":
		return docs.FetchPage(c, event.Data)
	case "fetch-docs":
		return adocs.FetchPage(c, event.Data)
	case "fetch-all-docs":
		return adocs.FetchAllPages(c, event.Data)
	case "create-docs-page":
		return adocs.CreatePage(c, event.Data)
	case "delete-docs-page":
		return adocs.DeletePage(c, event.Data)
	case "save-docs-page":
		return adocs.SavePage(c, event.Data)
	case "server-info":
		return info.GetServer(c)
	default:
		return types.Response{Broadcast: false, Data: map[string]string{"error": "unknown event"}}
	}
}
