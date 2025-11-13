package routes;

import (
"net/http";
"github.com/pocketbase/pocketbase/apis";
"github.com/pocketbase/pocketbase/core";

"rosalind/services/resume";
)

func RegisterResumeRoutes(serveEvent *core.ServeEvent) {
  group := serveEvent.Router.Group("/resume");
  group.Bind(apis.RequireAuth());

  group.POST("/export", func(e *core.RequestEvent) error {
    info, _ := e.RequestInfo();
    html, ok := info.Body["html"].(string);
    if (!ok) {
      return e.BadRequestError("Invalid request body", nil);
    }
    if (html == "") {
      return e.BadRequestError("Invalid request body", nil);
    }

    bytes, err := resume.ExportPdf(html);
    if (err != nil) {
      return e.BadRequestError("Failed to export pdf", err);
    }

    return e.Blob(http.StatusOK, "application/pdf", bytes);
  });
}