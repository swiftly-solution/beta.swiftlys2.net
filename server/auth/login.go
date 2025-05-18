package auth

import (
	"beta-swiftlys2-net/types"
)

func LoginUser(c *types.Client) types.Response {
	return types.Response{Broadcast: false, Data: map[string]any{"status": "false"}}
}
