package migrations

import (
	"os"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		superusers, err := app.FindCollectionByNameOrId(core.CollectionNameSuperusers)
		if err != nil {
			return err
		}

		record := core.NewRecord(superusers)

		SUPERUSER_EMAIL := os.Getenv("SUPERUSER_EMAIL")
		SUPERUSER_PASSWORD := os.Getenv("SUPERUSER_PASSWORD")

		record.Set("email", SUPERUSER_EMAIL)
		record.Set("password", SUPERUSER_PASSWORD)

		return app.Save(record)
	}, func(app core.App) error {
		SUPERUSER_EMAIL := os.Getenv("SUPERUSER_EMAIL")

		record, _ := app.FindAuthRecordByEmail(core.CollectionNameSuperusers, SUPERUSER_EMAIL)
		if record == nil {
			return nil
		}

		return app.Delete(record)
	})
}
