package ws

import (
	"beta-swiftlys2-net/types"
	"beta-swiftlys2-net/web/auth"
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
	case "server-info":
		return info.GetServer(c)
	default:
		return types.Response{Broadcast: false, Data: map[string]string{"error": "unknown event"}}
	}
}
