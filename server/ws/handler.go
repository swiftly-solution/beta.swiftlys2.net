package ws

import (
	"beta-swiftlys2-net/auth"
	"beta-swiftlys2-net/types"
	"encoding/json"
)

func HandleEvent(c *types.Client, msg []byte) types.Response {
	var event types.Event
	if err := json.Unmarshal(msg, &event); err != nil {
		return types.Response{Broadcast: false, Data: map[string]string{"error": "invalid format"}}
	}

	switch event.Type {
	case "echo":
		return types.Response{Broadcast: true, Data: map[string]string{"message": "reply"}}
	case "login":
		return auth.LoginUser(c)
	default:
		return types.Response{Broadcast: false, Data: map[string]string{"error": "unknown event"}}
	}
}
