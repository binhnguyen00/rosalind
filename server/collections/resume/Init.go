package resume;

import (
"log";

"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
)

func CreateResumeCollection(app *pocketbase.PocketBase) error {
  collection, err := app.FindCollectionByNameOrId("resume");

  if (err != nil) {
    log.Fatal(err);
    return err;
  }

  if (collection == nil) {
    collection = core.NewBaseCollection("resume");
  }

  userColl, _ := app.FindCollectionByNameOrId("users");

  collection.Fields.Add(
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

  return app.Save(collection);
}