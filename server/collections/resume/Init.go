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

  collection.Fields.Add(&core.TextField{
    Name      : "title",
    Required  : true,
    Max       : 100,
  });

  collection.Fields.Add(&core.TextField{
    Name      : "description",
    Required  : false,
    Max       : 1000,
  });

  usersCollection, err := app.FindCollectionByNameOrId("users");
  if (err != nil) {
    log.Fatal(err);
    return err;
  }
  collection.Fields.Add(&core.RelationField{
    Name          : "owner",
    Required      : true,
    CascadeDelete : false,
    CollectionId  : usersCollection.Id,
  });

  err = app.Save(collection);
  if (err != nil) {
    log.Fatal(err);
    return err;
  }

  return nil;
}