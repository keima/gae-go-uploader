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

// 今後使うかもなので残す・・・
/*func GetImageList(w rest.ResponseWriter, r *rest.Request) {
	c := appengine.NewContext(r.Request)
	f, err := oauth2.New(
		google.AppEngineContext(c),
		oauth2.Scope(storage.ScopeFullControl),
	)
	if err != nil {
		msg := fmt.Sprintf("failed to initiate an App Engine OAuth 2.0 flow: %v", err)
		rest.Error(w, msg, http.StatusUnauthorized)
		return
	}

	ctx := cloud.NewContext(appengine.AppID(c), &http.Client{Transport: f.NewTransport()})

	bucketName, err := DefaultBucketName(c)
	if err != nil {
		rest.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	objs, err := storage.ListObjects(ctx, bucketName, nil)
	if err != nil {
		rest.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

//	objs.

	w.EncodeJson()
}*/
