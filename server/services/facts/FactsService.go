package facts;

import (
"io"
"log"
"net/http"
"encoding/json"
)

type Fact struct {
  ID         string `json:"id"`
  Text       string `json:"text"`
  Source     string `json:"source"`
  SourceURL  string `json:"source_url"`
  Language   string `json:"language"`
  Permalink  string `json:"permalink"`
}

func Random() (*Fact, error) {
  url := "https://uselessfacts.jsph.pl/api/v2/facts/random"
  response, err := http.Get(url);

  if (err != nil) {
    log.Fatal(err);
    return nil, err;
  }

  if (response.StatusCode != http.StatusOK) {
    return nil, err;
  }

  body, err := io.ReadAll(response.Body);
  if (err != nil) {
    return nil, err;
  }

  var fact Fact;
  err = json.Unmarshal(body, &fact);
  if (err != nil) {
    return nil, err;
  }

  return &fact, nil;
}