# Webpackバージョン4の設定ファイル / 環境

Webpackのv4.xを使うための設定ファイルのテンプレートです。  
ES6の書き方、Sass（autoprefixer含む）の書き方もサポートしてます。

---

パッケージのインストール
```
npm i
```

---

```
npm start
```
webpack-serveでローカルサーバを立ち上げてます。  
`localhost:8080`にアクセスすれば見ることが可能です。  
このコマンドではpublicフォルダには吐き出されません。

---

```
npm run build
```
全てトランスパイル、コンパイルされた状態でpublicフォルダに吐き出されます。