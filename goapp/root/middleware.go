package root

import (
	"github.com/ant0ine/go-json-rest/rest"
)

type MyMiddleware struct{}

func (MyMiddleware) MiddlewareFunc(handler rest.HandlerFunc) rest.HandlerFunc {
	return func(w rest.ResponseWriter, r *rest.Request) {
//		c := appengine.NewContext(r.Request)
//
//		u := user.Current(c)
//		if u == nil || !user.IsAdmin(c) {
//			rest.Error(w, "Administrator login Required.", http.StatusUnauthorized)
//			return
//		}

		handler(w, r)
	}
}
