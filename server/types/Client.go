package types

import "github.com/gorilla/websocket"

type Client struct {
	Hub  *Hub
	Conn *websocket.Conn
	Send chan []byte
	IP   string

	ReadPump  func()
	WritePump func()
}
