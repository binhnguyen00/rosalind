package resume;

import (
"strings";
"github.com/pocketbase/pocketbase";
"github.com/SebastiaanKlippert/go-wkhtmltopdf";
)

func ExportPdf(html string) ([]byte, error) {
  tool, err := wkhtmltopdf.NewPDFGenerator()
  if err != nil {
    return nil, err
  }

  tool.Dpi.Set(96)

  reader := wkhtmltopdf.NewPageReader(strings.NewReader(html))
  reader.JavascriptDelay.Set(2000)
  reader.EnableLocalFileAccess.Set(true)

  tool.AddPage(reader)
  tool.Create()

  return tool.Bytes(), nil
}

func Update(app *pocketbase.PocketBase, data map[string]any) error {
  id := data["id"].(string);
  content := data["content"].(map[string]any);
  metadata := data["metadata"].(map[string]any);

  record, err := app.FindRecordById("resume", id); if (err != nil) {
    return err;
  }

  record.Set("metadata", metadata);
  record.Set("content", content);
  return app.Save(record);
}