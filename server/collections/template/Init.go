package template;

import (
"os";
"log";
"strings";
"path/filepath";
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
      Name      : "structure",
      Required  : false,
    },
    &core.EditorField{
      Name      : "stylesheet",
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

// CreateTemplateRecords loops through subdirectories in 'data/template'
// and creates a template record for each one found.
func CreateTemplateRecords(app *pocketbase.PocketBase) error {
  coll, err := app.FindCollectionByNameOrId(COLL_NAME)
  if err != nil {
    return err
  }

  if err := app.TruncateCollection(coll); err != nil {
    log.Printf("Warning: failed to truncate collection: %v", err)
  }

  templateBasePath := filepath.Join("data", "template")
  entries, err := os.ReadDir(templateBasePath)
  if err != nil {
    return err
  }

  log.Println("Scanning for templates...")
  for _, entry := range entries {
    if !entry.IsDir() {
      continue
    }

    dirName := entry.Name()
    if (strings.HasPrefix(dirName, "_")) {
      continue;
    }
    templateDir := filepath.Join(templateBasePath, dirName)

    templatePath := filepath.Join(templateDir, "template.hbs")
    stylesheetPath := filepath.Join(templateDir, "stylesheet.css")

    htmlFile, err := os.ReadFile(templatePath)
    if err != nil {
      log.Printf("Error: skipping template '%s': missing '%s' (%v)", dirName, templatePath, err)
      continue
    }

    cssFile, err := os.ReadFile(stylesheetPath)
    if err != nil {
      log.Printf("Error: skipping template '%s': missing '%s' (%v)", dirName, stylesheetPath, err)
      continue
    }

    record := core.NewRecord(coll)
    record.Set("label", strings.ToTitle(dirName)) // "default" -> "Default"
    record.Set("code", dirName)
    record.Set("active", true)
    record.Set("structure", string(htmlFile))
    record.Set("stylesheet", string(cssFile))

    if err := app.Save(record); err != nil {
      log.Printf("Error: failed to save template record '%s': %v", dirName, err)
      return err
    } else {
      log.Printf("Successfully created template: %s", dirName)
    }
  }

  log.Println("Template scan complete.")
  return nil
}