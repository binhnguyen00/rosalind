package main;

import (
"log";

"github.com/pocketbase/pocketbase"
"github.com/pocketbase/pocketbase/core"

"rosalind/routes"
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
    routes.RegisterWelcomeRoutes(e);
    routes.RegisterFactRoutes(e);
    return e.Next();
  });

  err := app.Start();
  if (err != nil) {
    log.Fatal(err)
  }
}