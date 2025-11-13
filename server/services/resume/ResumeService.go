package resume;

import (
"strings";
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