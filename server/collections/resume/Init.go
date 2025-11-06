package resume;

import (
"log";

"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
)

func CreateResumeCollection(app *pocketbase.PocketBase) error {
  collection, err := app.FindCollectionByNameOrId("resume");
  if (err != nil) {
    log.Fatal(err)
    return err;
  }

  if (collection == nil) {
    collection = core.NewBaseCollection("resume");
  }

  collection.Fields.Add(&core.TextField{
    Name      : "title",
    Required  : true,
    Max       : 100,
  })

  collection.Fields.Add(&core.TextField{
    Name      : "description",
    Required  : false,
    Max       : 1000,
  })

  collection.Fields.Add(&core.TextField{
    Name      : "user",
    Required  : false,
    Max       : 100,
  })

  err = app.Save(collection);
  if (err != nil) {
    log.Fatal(err)
    return err;
  }

  return nil;
}