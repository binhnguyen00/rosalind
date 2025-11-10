package routes;

import (
"net/http";
"rosalind/services/welcome";
"github.com/pocketbase/pocketbase/apis";
"github.com/pocketbase/pocketbase/core";
)

func RegisterWelcomeRoutes(serveEvent *core.ServeEvent) {
  serveEvent.Router.GET("/welcome", func(e *core.RequestEvent) error {
    return e.String(http.StatusOK, welcome.Greeting());
  });

  serveEvent.Router.GET("/test-auth", func(e *core.RequestEvent) error {
    return e.String(http.StatusOK, welcome.Greeting())
  }).Bind(apis.RequireAuth());
}