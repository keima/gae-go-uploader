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
