# Gulpバージョン4の設定ファイル / 環境

Gulpのv4.xを使うための設定ファイルのテンプレートです。  
ES6の書き方、Eslint、Pug（HTMLのテンプレートエンジン）、Sass（autoprefixer含む）の書き方もサポートしてます。

---

パッケージのインストール
```
npm i
```

---

```
npm run start
```
webpack-serveでローカルサーバを立ち上げてます。  
自動で`localhost:3000`がブラウザで開かれるはずです。  
全てトランスパイル、コンパイルされた状態でpublicフォルダに吐き出されます。

---

```
npm run build
```
全てトランスパイル、コンパイルされた状態でpublicフォルダに吐き出されます。
