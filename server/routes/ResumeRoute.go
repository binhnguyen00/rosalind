package routes;

import (
"net/http";

"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/apis";
"github.com/pocketbase/pocketbase/core";

"rosalind/services/resume";
)

func RegisterResumeRoutes(app *pocketbase.PocketBase, serveEvent *core.ServeEvent) {
  group := serveEvent.Router.Group("/resume");

  group.POST("/anonymous/export", func(e *core.RequestEvent) error {
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
  }).Bind(apis.RequireAuth());

  group.POST("/export", func(e *core.RequestEvent) error {
    info, _ := e.RequestInfo();
    isGuest := info.Auth == nil
    if (isGuest) {
      return e.BadRequestError("Invalid authentication", nil);
    }

    userId := info.Auth.Id;
    resumeId := info.Body["id"].(string);
    record, _ := e.App.FindFirstRecordByFilter("resume", 
      "owner = '" + userId + "' && id = '" + resumeId + "'",
    );
    if (record == nil) {
      return e.NotFoundError("Resume not found", nil);
    }

    // export then save
    html := record.Get("content").(string);
    bytes, err := resume.ExportPdf(html);
    if (err != nil) {
      return e.InternalServerError("Failed to export pdf", err);
    }
    resume.SaveContent(app, resumeId, html);

    return e.Blob(http.StatusOK, "application/pdf", bytes);
  });
}