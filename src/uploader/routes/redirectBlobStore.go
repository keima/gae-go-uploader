package routes

import (
	"net/http"
	"google.golang.org/appengine"
	"google.golang.org/appengine/blobstore"
)

// RedirectBlobStore is redirect BlobStore
func RedirectBlobStore(w http.ResponseWriter, r *http.Request) {
	blobstore.Send(w, appengine.BlobKey(r.FormValue("blobKey")))
}
