gae-go-uploader
===============

GAE/GoとGoogleCloudStorageで動作するイメージアップローダー

# How to Deploy your GAE

Current directory is `/path/to/git/gae-go-uploader`

1. Open `./src/uploader/settings/constant.go`.
2. Edit `GCS_PUBLIC_ACCESS_PATH`.
3. `goapp deploy ./src`
4. Enjoy!

# How to Develop

前提条件として`$GOPATH`に`/path/to/git/gae-go-uploader`を含むようにしておくか、`direnv`を導入しておく

`frontend`フォルダは、AngularJSで書かれたフロントエンドのコードが管理されています。
`goapp`フォルダには、GAE/Goで使用されるバックエンドのコードが管理されています。

Live Reloadしながらfrontendを編集するには・・・

1. Open terminal
2. `goapp serve src`
3. Ctrl+T to New Tab in Terminal
4. `cd frontend`
5. `gulp serve` (or `gulp` only)

あとGCSを全面的に使うことになったので、ローカルで検証するには以下のコマンドが必要。
詳しくは: https://cloud.google.com/appengine/docs/go/googlecloudstorageclient/sample-deploy-run#running_the_storage_example_locally

```
/path/to/AppEngSDK/dev_appserver.py . \
--appidentity_email_address <your_app_email_address>@developer.gserviceaccount.com \
--appidentity_private_key_path pem_file.pem
```


# Convert the key from pkcs12 to pkcs1 (PEM).
```
$ cat /path/to/xxxx-privatekey.p12 | openssl pkcs12 -nodes -nocerts -passin pass:notasecret | openssl rsa > /path/to/secret.pem
```

# ACL設定

デプロイには関係ないけど備忘

1. `gsutil defacl ch -u AllUsers:R gs://BUCKET_NAME`

