package resume;

import (
"strings";
"github.com/pocketbase/pocketbase";
"github.com/SebastiaanKlippert/go-wkhtmltopdf";
)

func ExportPdf(html string) ([]byte, error) {
  tool, err := wkhtmltopdf.NewPDFGenerator();
  if (err != nil) {
    return nil, err;
  }
  reader := wkhtmltopdf.NewPageReader(strings.NewReader(html));

  tool.AddPage(reader);
  tool.Create();

  return tool.Bytes(), nil;
}

func SaveContent(app *pocketbase.PocketBase, id string, content map[string]interface{}) error {
  record, err := app.FindRecordById("resume", id);
  if (err != nil) {
    return err;
  }

  record.Set("content", content);
  return app.Save(record);
}