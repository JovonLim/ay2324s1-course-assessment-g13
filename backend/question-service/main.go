package main

import (
	"github.com/labstack/echo/v4"
	"question-service/config"
	"question-service/controllers"

	"github.com/labstack/echo/v4/middleware"
)

func main() {
	config.ConnectDb()
	config.PopulateDb()
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:1234"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	questionGroup := e.Group("/questions")
	questionGroup.GET("", controllers.GetQuestions)
	questionGroup.GET("/:id", controllers.GetQuestion)
	questionGroup.POST("", controllers.CreateQuestion, controllers.AuthorizeAdminMiddleWare)
	questionGroup.DELETE("/:id", controllers.DeleteQuestion, controllers.AuthorizeAdminMiddleWare)

	e.Start(":8080")
}
