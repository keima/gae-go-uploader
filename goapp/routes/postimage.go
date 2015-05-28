package routes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"appengine"
	newappengine "google.golang.org/appengine"

	"github.com/keima/gae-go-uploader/goapp/models"
	"github.com/keima/gae-go-uploader/goapp/settings"
	"appengine/urlfetch"
	"google.golang.org/cloud/storage"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/cloud"
)

// PostImageHandler は画像アップロードを取り扱うハンドラー。
// multipart/form-data を扱うため、go-json-restは使用しない
func PostImageHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	newc := newappengine.NewContext(r)
	hc := &http.Client{
		Transport: &oauth2.Transport{
			Source: google.AppEngineTokenSource(newc, storage.ScopeFullControl),
			Base:   &urlfetch.Transport{Context: c},
		},
	}
	ctx := cloud.NewContext(appengine.AppID(c), hc)

	w.Header().Set("Content-Type", "application/json")

	if err := r.ParseMultipartForm(settings.UPLOAD_LIMIT_SIZE * 1024 * 1024); err != nil {
		if err.Error() == "permission denied" {
			httpError(w, "Upload Size is Too large", http.StatusRequestEntityTooLarge)
		} else {
			httpError(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	rawFile, fileHeader, err := r.FormFile("imagedata")
	if err != nil {
		c.Errorf("FormFile Error: %s", err.Error())
		httpError(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rawFile.Close()

	data, err := ioutil.ReadAll(rawFile)
	if err != nil {
		c.Errorf("%s", err.Error())
		httpError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	absFilename, err := DirectStore(c, ctx, data, fileHeader)
	if err != nil {
		c.Errorf("DirectStore: %s", err.Error())
		httpError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	image := models.Image{
		FilePath: absFilename,
	}
	image.Save(c)

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(models.AbstractFilePath(c, absFilename)))
}

func httpError(w http.ResponseWriter, msg string, status int) {
	w.Header().Set("Content-Type", "application/json")
	out, err := json.Marshal(map[string]string{"Error": msg})
	if err != nil {
		panic(err)
	}
	http.Error(w, string(out), status)
}

func httpOutput(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	out, err := json.Marshal(data)
	if err != nil {
		httpError(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(out)
}
