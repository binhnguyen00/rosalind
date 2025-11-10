package template

import (
"os"
"log"
"github.com/pocketbase/dbx"
"github.com/pocketbase/pocketbase"
"github.com/pocketbase/pocketbase/core"
)

var COLL_NAME string = "template"

func CreateTemplateCollection(app *pocketbase.PocketBase) error {
  collection, err := app.FindCollectionByNameOrId(COLL_NAME);

  if (err != nil) {
    log.Fatal(err);
    return err;
  }

  if (collection == nil) {
    collection = core.NewBaseCollection(COLL_NAME)
  }

  collection.Fields.Add(
    &core.TextField{
      Name      : "code",
      Required  : true,
      Max       : 20,
    },
    &core.TextField{
      Name      : "label",
      Required  : false,
      Max       : 100,
    },
    &core.EditorField{
      Name      : "html_structure",
      Required  : false,
    },
    &core.EditorField{
      Name      : "css_style",
      Required  : false,
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

  return app.Save(collection);
}

func CreateDefaultTemplate(app *pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId(COLL_NAME);

  exist, _ := app.FindFirstRecordByFilter(coll.Name, "code = '{:code}'", dbx.Params{
    "code": "default",
  })

  if (exist != nil) {
    app.Delete(exist);
  }
  exist = core.NewRecord(coll);
  exist.Set("label", "Default Template");
  exist.Set("active", true);

  htmlFile, _ := os.ReadFile("./data/html_structure.hbs");
  exist.Set("html_structure", string(htmlFile));

  cssFile, _ := os.ReadFile("./data/css_style.css");
  exist.Set("css_style", string(cssFile));

  return app.Save(exist);
}