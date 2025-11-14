package resume;

import (
"os";
"log";
"encoding/json";
"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
"github.com/pocketbase/pocketbase/tools/types";
)

var COLL_NAME string = "resume";

func CreateResumeCollection(app *pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId(COLL_NAME);

  if (coll != nil) {
    app.Delete(coll);
  }

  coll = core.NewBaseCollection(COLL_NAME);
  coll.ViewRule = types.Pointer("@request.auth.id != ''");
  coll.ListRule = types.Pointer("@request.auth.id != ''");

  userColl, _ := app.FindCollectionByNameOrId("users");

  coll.Fields.Add(
    &core.TextField{
      Name      : "label",
      Required  : false,
      Max       : 100,
    },
    &core.EditorField{
      Name      : "description",
      Required  : false,
    },
    &core.JSONField{
      Name      : "content",
      Required  : false,
    },
    &core.RelationField{
      Name          : "owner",
      CollectionId  : userColl.Id,
      MaxSelect     : 1,
      Required      : true,
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
  );

  return app.Save(coll);
}

func CreateDefaultResume(app *pocketbase.PocketBase) error {
  coll, err := app.FindCollectionByNameOrId("resume");
  if (err != nil) {
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
  jsonFile, _ := os.ReadFile("./data/resume.json");
  json.Unmarshal(jsonFile, &resume);
  record.Set("content", resume);

  return app.Save(record);
}