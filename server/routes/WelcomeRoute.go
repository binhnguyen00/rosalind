package routes;

import (
"net/http"

"rosalind/services/welcome"

"github.com/pocketbase/pocketbase/core"
)

func RegisterWelcomeRoutes(e *core.ServeEvent) {
  e.Router.GET("/welcome", func(e *core.RequestEvent) error {
    return e.String(http.StatusOK, welcome.Greeting());
  });
}