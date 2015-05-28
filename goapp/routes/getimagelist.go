package routes

import (
	"net/http"

	"github.com/ant0ine/go-json-rest/rest"
	"github.com/keima/gae-go-uploader/goapp/models"

	"appengine"
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

