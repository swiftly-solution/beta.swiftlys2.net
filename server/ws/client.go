package ws

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
}

func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()

}

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			break
		}

		response := HandleEvent(c, message)

		if response.Broadcast {
			c.hub.BroadcastJSON(response.Data)
		} else {
			data, err := json.Marshal(response.Data)
			if err == nil {
				c.send <- data
			}
		}
	}
}

func (c *Client) writePump() {
	defer c.conn.Close()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			c.conn.WriteMessage(websocket.TextMessage, message)
		}
	}
}
