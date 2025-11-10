package users;

import (
"github.com/pocketbase/pocketbase";
"github.com/pocketbase/pocketbase/core";
)

func CreateDefaultUser(app * pocketbase.PocketBase) error {
  coll, _ := app.FindCollectionByNameOrId("users");

  exist, _ := app.FindFirstRecordByFilter(coll.Name, "email = 'binh.nguyen@gmail.com'");
  if (exist != nil) {
    app.Delete(exist);
  }
  exist = core.NewRecord(coll)
  exist.Set("name", "binh.nguyen");
  exist.SetEmail("binh.nguyen@gmail.com");
  exist.SetPassword("123456789");
  exist.SetVerified(true);

  return app.Save(exist);
}