package main

import (
	"fmt"
	"net/http"
	"os"

	"user-service/config"
	"user-service/handlers"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	config.ConnectDb()

	fmt.Println("Starting development server")
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{os.Getenv("AGW_URL")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))
	e.Use(session.Middleware(sessions.NewCookieStore([]byte("Secret"))))

	e.POST("/users", handlers.CreateUser)
	e.GET("/users", handlers.GetUsers)
	e.GET("/users/:id", handlers.GetUser)
	e.PUT("/users/info/:id", handlers.UpdateUserInfo)
	e.PUT("/users/password/:id", handlers.UpdateUserPassword)
	e.DELETE("/users/delete/:id", handlers.DeleteUser)
	
	e.Logger.Fatal(e.Start(":8080"))
}
