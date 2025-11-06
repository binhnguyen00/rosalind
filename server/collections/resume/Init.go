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

  usersCollection, err := app.FindCollectionByNameOrId("users");

  collection.Fields.Add(
    &core.TextField{
      Name      : "title",
      Required  : true,
      Max       : 100,
    },
    &core.RelationField{
      Name          : "owner",
      Required      : true,
      CascadeDelete : false,
      CollectionId  : usersCollection.Id,
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