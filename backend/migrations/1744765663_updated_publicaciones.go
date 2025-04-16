package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1709211378")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "file2093472300",
			"maxSelect": 1,
			"maxSize": 100000000,
			"mimeTypes": [
				"video/mp4",
				"video/x-ms-wmv",
				"video/quicktime",
				"video/3gpp"
			],
			"name": "video",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1709211378")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "file2093472300",
			"maxSelect": 1,
			"maxSize": 0,
			"mimeTypes": [
				"video/mp4",
				"video/x-ms-wmv",
				"video/quicktime",
				"video/3gpp"
			],
			"name": "video",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
