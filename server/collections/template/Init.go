package template;

import (
"os";
"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
"github.com/pocketbase/pocketbase/tools/types";
)

var COLL_NAME string = "template";

func CreateTemplateCollection(app *pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId(COLL_NAME);

  if (coll != nil) {
    app.Delete(coll);
  }

  coll = core.NewBaseCollection(COLL_NAME)
  coll.ViewRule = types.Pointer("@request.auth.id != ''");
  coll.ListRule = types.Pointer("@request.auth.id != ''");

  coll.Fields.Add(
    &core.TextField{
      Name      : "label",
      Required  : false,
      Max       : 100,
    },
    &core.TextField{
      Name      : "code",
      Required  : false,
      Max       : 20,
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

  app.TruncateCollection(coll);

  record := core.NewRecord(coll);
  record.Set("label", "Default Template");
  record.Set("code", "default");
  record.Set("active", true);

  htmlFile, _ := os.ReadFile("./data/default_template.hbs");
  record.Set("html_structure", string(htmlFile));

  cssFile, _ := os.ReadFile("./data/stylesheet.css");
  record.Set("css_style", string(cssFile));

  return app.Save(record);
}