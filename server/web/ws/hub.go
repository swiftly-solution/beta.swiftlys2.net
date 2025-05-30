package ws

import (
	"beta-swiftlys2-net/types"
	"encoding/json"
)

func NewHub() *types.Hub {
	h := &types.Hub{
		Broadcast:  make(chan []byte),
		Register:   make(chan *types.Client),
		Unregister: make(chan *types.Client),
		Clients:    make(map[*types.Client]bool),
	}

	h.Run = func() {
		for {
			select {
			case client := <-h.Register:
				h.Clients[client] = true
			case client := <-h.Unregister:
				if _, ok := h.Clients[client]; ok {
					delete(h.Clients, client)
					close(client.Send)
				}
			case message := <-h.Broadcast:
				for client := range h.Clients {
					select {
					case client.Send <- message:
					default:
						close(client.Send)
						delete(h.Clients, client)
					}
				}
			}
		}
	}

	h.BroadcastJSON = func(v interface{}) {
		data, err := json.Marshal(v)
		if err != nil {
			return
		}
		h.Broadcast <- data
	}

	return h
}
