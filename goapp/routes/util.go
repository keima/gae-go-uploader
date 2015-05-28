package routes

import (
	"mime/multipart"
	"strconv"
	"time"

	"appengine"
	"golang.org/x/net/context"
	"google.golang.org/cloud/storage"
	"fmt"
	"github.com/keima/gae-go-uploader/goapp/settings"
)

// ファイルを保存し、/gs/で始まるファイルパスを返す
func DirectStore(c appengine.Context, ctx context.Context, data []byte, fileHeader *multipart.FileHeader) (string, error) {
	bucketName := settings.GCS_DEFAULT_BUCKET_NAME
	fileName := generateFileName()

	c.Infof("Save: /gs/%s/%s", bucketName, fileName)

	wc := storage.NewWriter(ctx, bucketName, fileName)
	wc.ContentType = fileHeader.Header.Get("Content-Type")
	if _, err := wc.Write(data); err != nil {
		return "", err
	}
	if err := wc.Close(); err != nil {
		return "", err
	}

	return absFileName(bucketName, fileName), nil
}

func generateFileName() string {
	return strconv.FormatInt(time.Now().UnixNano(), 10)
}

func absFileName(bucketName, filename string) string {
	return fmt.Sprintf("/gs/%s/%s", bucketName, filename)
}