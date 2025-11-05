package routes;

import (
"net/http"

"rosalind/services/facts"

"github.com/pocketbase/pocketbase/core"
)

func RegisterFactRoutes(e *core.ServeEvent) {
  e.Router.GET("/fact", func(e *core.RequestEvent) error {
    fact, err := facts.Random();
    if (err != nil) {
      return e.NoContent(http.StatusNoContent);
    }
    return e.String(http.StatusOK, fact.Text);
  });
}