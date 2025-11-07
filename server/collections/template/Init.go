package template;

import (
"os";
"log";

"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
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

  err = app.Save(collection);
  if (err != nil) {
    return err;
  }

  sample := core.NewRecord(collection);
  sample.Set("label", "Template 01");
  sample.Set("active", true);

  htmlFile, _ := os.ReadFile("./migrations/data/html_structure.hbs");
  sample.Set("html_structure", string(htmlFile));

  cssFile, _ := os.ReadFile("./migrations/data/css_style.css");
  sample.Set("css_style", string(cssFile));

  err = app.Save(sample);
  if (err != nil) {
    return err;
  }

  return nil;
}