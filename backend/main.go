package main

import (
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	"github.com/ynoacamino/publicaciones-page/backend/hooks"
	_ "github.com/ynoacamino/publicaciones-page/backend/migrations"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	hooks.HookHandler(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
