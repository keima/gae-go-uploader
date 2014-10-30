package root

import (
	"log"
	"net/http"

	"github.com/ant0ine/go-json-rest/rest"
	"github.com/keima/gae-go-uploader/goapp/routes"
)

func init() {
	handler := rest.ResourceHandler{
		PreRoutingMiddlewares: []rest.Middleware{
			&MyMiddleware{},
		},
	}

	//@formatter:off
	err := handler.SetRoutes(
		&rest.Route{"GET", "/api/v1/images", routes.GetImageList},
		//		&rest.Route{"GET",    "/api/images/#id", GetImage},
		//		&rest.Route{"DELETE", "/api/images/#id", DeleteImage},
	)
	//@formatter:on

	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/api/upload", routes.PostImageHandler)
	http.HandleFunc("/api/show/", routes.RedirectBlobStore)

	http.Handle("/", &handler)
}
