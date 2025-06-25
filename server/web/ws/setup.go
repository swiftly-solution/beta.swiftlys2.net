package ws

import (
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupWebServices() {
	gin.SetMode(gin.ReleaseMode)

	hub := NewHub()
	go hub.Run()

	router := gin.New()

	router.Use(gin.Recovery())

	router.RemoteIPHeaders = []string{"CF-Connecting-IP", "X-Forwarded-For"}

	router.Use(static.Serve("/", static.LocalFile("../client/build/client", false)))
	router.NoRoute(func(ctx *gin.Context) {
		if !strings.HasPrefix(ctx.Request.URL.Path, "/api") {
			ctx.File("../client/build/client/index.html")
		}
	})

	router.GET("/api", func(ctx *gin.Context) {
		ServeWs(hub, ctx.Writer, ctx.Request, ctx.ClientIP())
	})

	router.Run(":9999")
}
