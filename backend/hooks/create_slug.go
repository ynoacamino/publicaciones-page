package hooks

import (
	"net/url"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func CreateSlug(app *pocketbase.PocketBase) {
	app.OnRecordCreateRequest("publicaciones").BindFunc(func(e *core.RecordRequestEvent) error {
		slug := e.Record.GetString("slug")
		if slug != "" {
			return e.Next()
		}

		title := e.Record.GetString("titulo")

		slug = url.PathEscape(title)

		e.Record.Set("slug", slug)

		app.Save(e.Record)

		return e.Next()
	})
}
