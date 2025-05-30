package ws

import (
	"beta-swiftlys2-net/types"
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func ServeWs(hub *types.Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	client := &types.Client{Hub: hub, Conn: conn, Send: make(chan []byte, 256), Cookies: map[string]any{
		"authenticated": false,
	}}
	client.Hub.Register <- client

	client.ReadPump = func() {
		defer func() {
			client.Hub.Unregister <- client
			client.Conn.Close()
		}()

		for {
			_, message, err := client.Conn.ReadMessage()
			if err != nil {
				break
			}

			response := HandleEvent(client, message)

			if response.Broadcast {
				client.Hub.BroadcastJSON(response.Data)
			} else {
				data, err := json.Marshal(response.Data)
				if err == nil {
					client.Send <- data
				}
			}
		}
	}

	client.WritePump = func() {
		defer client.Conn.Close()
		for {
			select {
			case message, ok := <-client.Send:
				if !ok {
					client.Conn.WriteMessage(websocket.CloseMessage, []byte{})
					return
				}
				client.Conn.WriteMessage(websocket.TextMessage, message)
			}
		}
	}

	go client.WritePump()
	go client.ReadPump()

}
