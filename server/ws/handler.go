package ws

import (
	"encoding/json"
)

type Event struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data"`
}

type Response struct {
	Broadcast bool
	Data      interface{}
}

func HandleEvent(c *Client, msg []byte) Response {
	var event Event
	if err := json.Unmarshal(msg, &event); err != nil {
		return Response{Broadcast: false, Data: map[string]string{"error": "invalid format"}}
	}

	switch event.Type {
	case "echo":
		return Response{Broadcast: true, Data: map[string]string{"message": "muie blu"}}
	default:
		return Response{Broadcast: false, Data: map[string]string{"error": "unknown event"}}
	}
}
