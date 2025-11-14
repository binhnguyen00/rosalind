package main;

import (
"os";
"log";
"strings";

"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
"github.com/pocketbase/pocketbase/plugins/migratecmd";

"rosalind/routes";
"rosalind/collections/users";
"rosalind/collections/resume";
"rosalind/collections/template";
);

func main() {
  var app *pocketbase.PocketBase = pocketbase.New();

  app.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
    log.Println("Hello! This is Rosalind :)");
    return e.Next();
  });

  app.OnServe().BindFunc(func(e *core.ServeEvent) error {
    isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())
    if (isGoRun) { // only init data on development
      users.CreateDefaultUser(app);

      resume.CreateResumeCollection(app);
      resume.CreateDefaultResume(app);

      template.CreateTemplateCollection(app);
      template.CreateDefaultTemplate(app);
    }

    routes.RegisterWelcomeRoutes(app, e);
    routes.RegisterResumeRoutes(app, e);
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