package migrations;

import (
"log";

"github.com/pocketbase/pocketbase/core";
m "github.com/pocketbase/pocketbase/migrations";
)

func init() {
  up := func(app core.App) error {
    log.Println("Adding default user");
    coll, err := app.FindCollectionByNameOrId("users");
    if (err != nil) {
      log.Fatal(err);
      return err;
    }

    record := core.NewRecord(coll);
    record.Set("name", "binh.nguyen");
    record.SetEmail("binh.nguyen@gmail.com");
    record.SetPassword("123456789");
    record.SetVerified(true);

    return app.Save(record);
  }

  down := func(app core.App) error {
    log.Println("Removing default user");
    record, err := app.FindFirstRecordByFilter("users", "email = 'binh.nguyen@gmail.com'");
    if (err != nil) {
      log.Fatal(err);
      return err;
    }

    return app.Delete(record);
  }

  m.Register(up, down);
}