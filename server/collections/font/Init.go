package font;

import (
"log";
"os";
"strings";
"encoding/json";
"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
"github.com/pocketbase/pocketbase/tools/types";
);

var COLL_NAME string = "font";

func CreateFontCollection(app *pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId(COLL_NAME);

  if (coll != nil) {
    app.Delete(coll);
  }

  coll = core.NewBaseCollection(COLL_NAME);
  coll.ViewRule = types.Pointer("@request.auth.id != ''");
  coll.ListRule = types.Pointer("@request.auth.id != ''");

  coll.Fields.Add(
    &core.TextField{
      Name      : "label",
      Required  : false,
      Max       : 100,
    },
    &core.TextField{
      Name      : "url",
      Required  : false,
      Max       : 200,
    },
    &core.BoolField{
      Name      : "active",
      Required  : false,
    },
    &core.AutodateField{
      Name      : "created",
      OnCreate  : true,
    },
    &core.AutodateField{
      Name      : "updated",
      OnCreate  : true,
      OnUpdate  : true,
    },
  )

  return app.Save(coll);
}

func CreateDefaultFonts(app *pocketbase.PocketBase) error {
  coll, err := app.FindCollectionByNameOrId(COLL_NAME)
  if err != nil {
    return err;
  }

  if err := app.TruncateCollection(coll); err != nil {
    log.Printf("Warning: failed to truncate collection: %v", err);
  }

  entries, err := os.ReadFile("./data/fonts.json"); if (err != nil) {
    return err;
  }

  fonts := make([]string, 0)
  if err := json.Unmarshal(entries, &fonts); (err != nil) {
    return err;
  }

  for _, font := range fonts {
    record := core.NewRecord(coll)
    record.Set("label", font);
    record.Set("url", "https://fonts.googleapis.com/css2?family=" + strings.ReplaceAll(font, " ", "+") + "&display=swap");
    record.Set("active", true);
    if err := app.Save(record); err != nil {
      return err;
    }
  }

  return nil;
}
