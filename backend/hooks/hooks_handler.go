package hooks

import "github.com/pocketbase/pocketbase"

func HookHandler(app *pocketbase.PocketBase) {
	CreateSlug(app)
}
