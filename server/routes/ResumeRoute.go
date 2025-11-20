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
  }).Bind(apis.RequireGuestOnly());

  group.POST("/export", func(e *core.RequestEvent) error {
    info, _ := e.RequestInfo();
    resumeId := info.Body["id"].(string);
    content := info.Body["content"].(map[string]interface{});
    html := info.Body["html"].(string);

    // export then save
    bytes, err := resume.ExportPdf(html);
    if (err != nil) {
      return e.InternalServerError("Failed to export pdf", err);
    }
    resume.SaveContent(app, resumeId, content);

    return e.Blob(http.StatusOK, "application/pdf", bytes);
  }).Bind(apis.RequireAuth());

  group.POST("/save", func(e *core.RequestEvent) error {
    info, _ := e.RequestInfo();
    resumeId := info.Body["id"].(string);
    content := info.Body["content"].(map[string]interface{});

    if (resumeId == "" || content == nil) {
      return e.BadRequestError("Invalid request body", nil);
    }

    err := resume.SaveContent(app, resumeId, content);
    if (err != nil) {
      return e.InternalServerError("Failed to save resume", err);
    }

    response := map[string]any{
      "isSuccess": true,
      "message": "save successfully",
      "data": content,
    };
    return e.JSON(http.StatusOK, response);
  }).Bind(apis.RequireAuth());
}