package routes;

import (
"fmt";
"net/http";
"rosalind/services/welcome";
"github.com/pocketbase/pocketbase/apis";
"github.com/pocketbase/pocketbase/core";
)

func RegisterWelcomeRoutes(serveEvent *core.ServeEvent) {
  serveEvent.Router.GET("/welcome", func(e *core.RequestEvent) error {
    return e.String(http.StatusOK, welcome.Greeting());
  });

  serveEvent.Router.GET("/", func(e *core.RequestEvent) error {
    info, _ := e.RequestInfo();
    fmt.Println(info);
    return nil;
  }).Bind(apis.RequireAuth());
}