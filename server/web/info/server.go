package info

import "beta-swiftlys2-net/types"

func GetServer(c *types.Client) types.Response {
	return types.Response{Broadcast: false, Data: map[string]any{"event": "server-info", "data": map[string]string{"name": "beta-server"}}}
}
