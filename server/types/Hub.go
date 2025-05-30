package types

type Hub struct {
	Clients    map[*Client]bool
	Broadcast  chan []byte
	Register   chan *Client
	Unregister chan *Client

	Run           func()
	BroadcastJSON func(v interface{})
}
