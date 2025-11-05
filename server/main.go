package main;

import (
"log";
"net/http"

"github.com/pocketbase/pocketbase"
"github.com/pocketbase/pocketbase/core"

"rosalind/services/facts"
"rosalind/services/welcome"
);

func main() {
  var app *pocketbase.PocketBase = pocketbase.New();

  app.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
    log.Println("Hello! This is Rosalind :)");
    err := e.Next();
    if (err != nil) {
      return err;
    }
    return nil;
  });

  app.OnServe().BindFunc(func(e *core.ServeEvent) error {
    e.Router.GET("/welcome", func(e *core.RequestEvent) error {
      return e.String(http.StatusOK, welcome.Greeting());
    });
    return e.Next();
  });

  app.OnServe().BindFunc(func(e *core.ServeEvent) error {
    e.Router.GET("/fact", func(e *core.RequestEvent) error {
      fact, err := facts.Random();
      if (err != nil) {
        return e.NoContent(http.StatusNoContent);
      }
      return e.String(http.StatusOK, fact.Text);
    });
    return e.Next();
  });

  err := app.Start();
  if (err != nil) {
    log.Fatal(err)
  }
}