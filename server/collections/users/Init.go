package users;

import (
"log";
"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
)

func CreateDefaultUsers(app * pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId("users");

  users := []map[string]string{
    {
      "name": "rosalind",
      "email": "rosalind@gmail.com",
    },
    {
      "name": "binh.nguyen",
      "email": "binh.nguyen@gmail.com",
    },
  }

  for _, user := range users {
    log.Printf("Creating user: %s", user["email"])
    exist, _ := app.FindFirstRecordByFilter(coll, "email = '" + user["email"] + "'");
    if (exist != nil) {
      log.Printf("User %s already exists", user["email"])
      continue;
    }

    record := core.NewRecord(coll)
    record.Set("name", user["name"]);
    record.SetEmail(user["email"]);
    record.SetPassword("123456789");
    record.SetVerified(true);
    err := app.Save(record); if (err != nil) {
      return err;
    } else {
      log.Printf("Created user: %s", user["email"])
    }
  }

  return nil;
}