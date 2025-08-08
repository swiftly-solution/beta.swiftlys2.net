package ws

import (
	"beta-swiftlys2-net/types"
	"net/http"
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupWebServices() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()

	router.Use(gin.Recovery())

	router.RemoteIPHeaders = []string{"CF-Connecting-IP", "X-Forwarded-For"}

	router.Use(static.Serve("/", static.LocalFile("../client/build/client", false)))
	router.NoRoute(func(ctx *gin.Context) {
		if !strings.HasPrefix(ctx.Request.URL.Path, "/api") {
			ctx.File("../client/build/client/index.html")
		}
	})

	router.POST("/api", func(ctx *gin.Context) {
		var request types.Event
		if err := ctx.ShouldBindJSON(&request); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		client := &types.Client{IP: ctx.ClientIP()}
		response := HandleEvent(client, request)
		ctx.JSON(200, response)
	})

	router.Run(":9999")
}
