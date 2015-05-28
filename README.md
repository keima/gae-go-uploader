gae-go-uploader
===============

GAE/Go上で動作するアップローダーです。

# How to Deploy your GAE

Current directory is `/path/to/git/gae-go-uploader`

1. Open `goapp/settings/global_settings.go`.
2. Edit `GCS_PUBLIC_ACCESS_PATH`.
3. `goapp deploy goapp/root`
4. Enjoy!

# How to Develop

`frontend`フォルダは、AngularJSで書かれたフロントエンドのコードが管理されています。
`goapp`フォルダには、GAE/Goで使用されるバックエンドのコードが管理されています。

Live Reloadしながらfrontendを編集するには・・・

1. Open terminal
2. `goapp serve goapp/root`
3. Ctrl+T to New Tab in Terminal
4. `cd frontend`
5. `gulp serve` (or `gulp` only)

あとGCSを全面的に使うことになったので、以下のコマンドが必要。
詳しくは https://cloud.google.com/appengine/docs/go/googlecloudstorageclient/getstarted#running_the_storage_example_locally

```sh
#!/bin/sh

gcloud preview app run ./goapp/root/app.yaml \
--appidentity-email-address *****@developer.gserviceaccount.com \
--appidentity-private-key-path *****.pem
```


# Convert the key from pkcs12 to pkcs1 (PEM).
```
$ cat /path/to/xxxx-privatekey.p12 | openssl pkcs12 -nodes -nocerts -passin pass:notasecret | openssl rsa > /path/to/secret.pem
```

# ACL設定

デプロイには関係ないけど備忘

1. `gsutil defacl ch -u AllUsers:R gs://BUCKET_NAME`

