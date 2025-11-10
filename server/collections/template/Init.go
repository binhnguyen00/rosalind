package template;

import (
"os";
"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
)

var COLL_NAME string = "template";

func CreateTemplateCollection(app *pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId(COLL_NAME);

  if (coll != nil) {
    app.Delete(coll);
  }

  coll = core.NewBaseCollection(COLL_NAME)
  coll.Fields.Add(
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

  return app.Save(coll);
}

func CreateDefaultTemplate(app *pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId(COLL_NAME);

  record := core.NewRecord(coll);
  record.Set("label", "Default Template");
  record.Set("active", true);

  htmlFile, _ := os.ReadFile("./data/html_structure.hbs");
  record.Set("html_structure", string(htmlFile));

  cssFile, _ := os.ReadFile("./data/css_style.css");
  record.Set("css_style", string(cssFile));

  return app.Save(record);
}