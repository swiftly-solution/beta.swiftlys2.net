package main

import (
	"beta-swiftlys2-net/ws"
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	hub := ws.NewHub()
	go hub.Run()

	router := gin.New()

	router.Use(gin.Recovery())

	router.Use(static.Serve("/", static.LocalFile("../client/build/client", false)))
	router.NoRoute(func(ctx *gin.Context) {
		if !strings.HasPrefix(ctx.Request.URL.Path, "/api") {
			ctx.File("../client/build/client/index.html")
		}
	})

	router.GET("/api", func(ctx *gin.Context) {
		ws.ServeWs(hub, ctx.Writer, ctx.Request)
	})

	router.Run(":9999")
}
