package routes

import (
	"mime/multipart"
	"strconv"
	"time"

	"appengine"
	"appengine/file"
)

// ファイルを保存し、/gs/で始まるファイルパスを返す
func DirectStore(c appengine.Context, data []byte, fileHeader *multipart.FileHeader) (absFilename string, err error) {
	opts := &file.CreateOptions{
		MIMEType: fileHeader.Header.Get("Content-Type"),
	}

	wc, absFilename, err := file.Create(c, generateFileName(), opts)
	if err != nil {
		return "", err
	}
	defer wc.Close()

	_, err = wc.Write(data)
	if err != nil {
		return "", err
	}

	return absFilename, nil
}

// DefaultBucketNameを返す
func DefaultBucketName(c appengine.Context) (string, error) {
	bucketName, err := file.DefaultBucketName(c)
	if err != nil {
		return "", err
	}
	return bucketName, nil
}

func generateFileName() string {
	return strconv.FormatInt(time.Now().UnixNano(), 10)
}
