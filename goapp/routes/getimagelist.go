package routes

import (
	"net/http"

	"gopkg.in/ant0ine/go-json-rest.v3/rest"
	"github.com/keima/gae-go-uploader/goapp/models"

	"google.golang.org/appengine"
)

func GetImageList(w rest.ResponseWriter, r *rest.Request) {
	c := appengine.NewContext(r.Request)

	list, err := models.LoadList(c, 0, 20)
	if err != nil {
		rest.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteJson(&list)
}

