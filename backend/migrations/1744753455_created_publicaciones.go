package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text393297498",
					"max": 0,
					"min": 0,
					"name": "titulo",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3075487697",
					"max": 0,
					"min": 0,
					"name": "previsualizacion",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor3500620159",
					"maxSize": 0,
					"name": "contenido",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "file2199507635",
					"maxSelect": 1,
					"maxSize": 0,
					"mimeTypes": [
						"image/jpeg",
						"image/png",
						"image/svg+xml",
						"image/gif",
						"image/webp"
					],
					"name": "imagen",
					"presentable": false,
					"protected": false,
					"required": true,
					"system": false,
					"thumbs": [],
					"type": "file"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3395401181",
					"max": 0,
					"min": 0,
					"name": "titulo_del_contenido",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "date3846423145",
					"max": "",
					"min": "",
					"name": "fecha_de_publicacion",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "file4279169243",
					"maxSelect": 99,
					"maxSize": 0,
					"mimeTypes": [
						"application/pdf",
						"application/msword",
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						"application/vnd.ms-excel",
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					],
					"name": "pdfs",
					"presentable": false,
					"protected": false,
					"required": false,
					"system": false,
					"thumbs": [],
					"type": "file"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2482362807",
					"hidden": false,
					"id": "text822566586",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "autor",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2207327058",
					"hidden": false,
					"id": "relation3770488265",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "seccion",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text190089999",
					"max": 0,
					"min": 0,
					"name": "slug",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_1709211378",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_7rvNHCGp73` + "`" + ` ON ` + "`" + `publicaciones` + "`" + ` (` + "`" + `titulo` + "`" + `)"
			],
			"listRule": "",
			"name": "publicaciones",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": ""
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1709211378")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
