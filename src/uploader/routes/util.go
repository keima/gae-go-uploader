package routes

import (
	"fmt"
	"time"
	"strconv"
	"mime/multipart"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
	"google.golang.org/cloud/storage"
	"uploader/settings"
)

// ファイルを保存し、/gs/で始まるファイルパスを返す
func DirectStore(c context.Context, data []byte, fileHeader *multipart.FileHeader) (string, error) {
	bucketName := settings.GCS_DEFAULT_BUCKET_NAME
	fileName := generateFileName()

	log.Infof(c, "Save: /gs/%s/%s", bucketName, fileName)

	client, err := storage.NewClient(c)
	if err != nil {
		return "", err
	}

	wc := client.Bucket(bucketName).Object(fileName).NewWriter(c)
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