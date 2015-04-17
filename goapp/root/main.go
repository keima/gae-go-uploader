package root

import (
	"log"
	"net/http"

	"github.com/ant0ine/go-json-rest/rest"
	"github.com/keima/gae-go-uploader/goapp/routes"
)

func init() {
	api := rest.NewApi()
	api.Use(rest.DefaultDevStack...)

	//@formatter:off
	router, err := rest.MakeRouter(
		rest.Get("/api/v1/images", routes.GetImageList),
	)
	//@formatter:on

	if err != nil {
		log.Fatal(err)
	}
	api.SetApp(router)

	http.HandleFunc("/api/upload", routes.PostImageHandler)
	http.HandleFunc("/api/show/", routes.RedirectBlobStore)
	http.Handle("/", api.MakeHandler())
}
