package migrations;

import (
"os";
"log";
"encoding/json";

"github.com/pocketbase/dbx";
"github.com/pocketbase/pocketbase/core";
m "github.com/pocketbase/pocketbase/migrations";
)

func init() {
  up := func(app core.App) error {
    log.Println("Adding default resume");
    coll, err := app.FindCollectionByNameOrId("resume");
    if (err != nil) {
      log.Fatal(err);
      return err;
    }

    user, err := app.FindFirstRecordByFilter("users", "email = 'binh.nguyen@gmail.com'");
    if (err != nil) {
      log.Fatal(err);
      return err;
    }

    record := core.NewRecord(coll);
    record.Set("label", "binh.nguyen Resume");
    record.Set("owner", user.Id);

    var resume map[string]interface{};
    jsonFile, _ := os.ReadFile("./migrations/data/resume.json");
    json.Unmarshal(jsonFile, &resume);
    record.Set("content", resume);

    return app.Save(record);
  }

  down := func(app core.App) error {
    user, err := app.FindFirstRecordByFilter("users", "email = 'binh.nguyen@gmail.com'");
    if (err != nil) {
      log.Fatal(err);
      return err;
    }

    records := []*core.Record{};
    err = app.RecordQuery("resume").
      AndWhere(dbx.HashExp{"owner": user.Id}).
      All(&records);

    if (err != nil) {
      log.Println("Failed to find resume");
      log.Fatal(err);
      return err;
    }

    for _, record := range records {
      app.Delete(record);
    }

    return nil;
  }

  m.Register(up, down);
}