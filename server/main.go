package main;

import (
"log";

"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
"github.com/pocketbase/pocketbase/plugins/migratecmd";

"rosalind/routes";
"rosalind/collections/resume";

_ "rosalind/migrations";
);

func main() {
  var app *pocketbase.PocketBase = pocketbase.New();

  app.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
    log.Println("Hello! This is Rosalind :)");
    return e.Next();
  });

  app.OnServe().BindFunc(func(e *core.ServeEvent) error {
    resume.CreateResumeCollection(app);

    routes.RegisterWelcomeRoutes(e);

    return e.Next();
  });

  migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
    Automigrate: true,
  });

  err := app.Start();
  if (err != nil) {
    log.Fatal(err);
  }
}