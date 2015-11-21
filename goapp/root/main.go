package root

import (
	"log"
	"net/http"

	"gopkg.in/ant0ine/go-json-rest.v3/rest"
	"github.com/keima/gae-go-uploader/goapp/routes"
	"google.golang.org/appengine"
)

func init() {
	api := rest.NewApi()
	var middlewares []rest.Middleware
	if appengine.IsDevAppServer() {
		middlewares = rest.DefaultDevStack
	} else {
		middlewares = rest.DefaultProdStack
	}

	api.Use(middlewares...)

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
