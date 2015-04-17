package models

import (
	"regexp"
	"strconv"

	"github.com/keima/gae-go-uploader/goapp/settings"
	"github.com/knightso/base/gae/ds"

	"appengine"
	"appengine/blobstore"
	"appengine/datastore"
)

const kindName = "Images"

var regExpMatchFileName = regexp.MustCompile(`\/gs\/.+\/(.+)`)

// Image model class and orm functions
type Image struct {
	ds.Meta
	Id       string `datastore:"-" json:"id"`
	Url      string `datastore:"-" json:"url"`
	FilePath string `json:"filePath"`
	FileName string `datastore:"-" json:"fileName"`
}

func (item *Image) Save(c appengine.Context) error {
	key := datastore.NewIncompleteKey(c, kindName, nil)
	item.SetKey(key)
	return ds.Put(c, item)
}

func (item *Image) Load(c appengine.Context, keyName string) error {
	key := datastore.NewKey(c, kindName, keyName, 0, nil)

	if err := ds.Get(c, key, item); err != nil {
		return err
	}

	item.Id = item.GetKey().StringID()

	return nil
}

func LoadList(c appengine.Context, offset int, limit int) (*[]Image, error) {
	items := make([]Image, 0, limit)
	q := datastore.NewQuery(kindName).Order("-UpdatedAt").Offset(offset).Limit(limit)

	if err := ds.ExecuteQuery(c, q, &items); err != nil {
		return nil, err
	}

	for index, item := range items {
		items[index].Id = strconv.FormatInt(item.GetKey().IntID(), 10)
		items[index].Url = AbstractFilePath(c, item.FilePath)
		items[index].FileName = fileName(item.FilePath)
	}

	return &items, nil
}

// AbstractFilePath は filePath で与えられた /gs/... で始まるパスから、
// 実際にアクセス可能なURLを返却します。
func AbstractFilePath(c appengine.Context, filePath string) string {
	if appengine.IsDevAppServer() {
		key, err := blobstore.BlobKeyForFile(c, filePath)
		if err != nil {
			return ""
		}

		return "http://" + appengine.DefaultVersionHostname(c) + "/api/show/?blobKey=" + string(key)
	}
	return settings.GCS_PUBLIC_ACCESS_PATH + fileName(filePath)
}

// convert /gs/app_default_bucket/cx-HGYdy.png -> cx-HGYdy.png
// FIXME: めんどくさいのでerror潰してる・・・
func fileName(absFileName string) string {
	groups := regExpMatchFileName.FindStringSubmatch(absFileName)
	if groups == nil {
		return "" // , errors.New(absFileName + " is Not matched")
	}
	return groups[1] // , nil
}
