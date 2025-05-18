package types

import "github.com/gorilla/websocket"

type Client struct {
	Hub     *Hub
	Conn    *websocket.Conn
	Send    chan []byte
	Cookies map[string]any

	ReadPump  func()
	WritePump func()
}
