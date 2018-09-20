import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
console.log('nodeEnv ==> ', nodeEnv);
console.log('isDev ==> ', isDev);

const config = {
  mode: nodeEnv,
  devtool: isDev ? 'source-map' : 'eval',
  entry: {
    app: `${src}/javascripts/app.js`,
  },
  output: {
    path: dist,
    filename: `javascripts/[name].js`,
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('stylesheets/style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${src}/index.html`
    }),
    // 画像をいちいちjsファイルにimportするのは面倒なのでコピー
    // CSSで使ってる画像にしか必要ないんだけども。。
    new CopyWebpackPlugin([{
      from: `${src}/images`,
      to: `${dist}/images`
    }])
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  serve: {
    port: 8080,
    reload: true,
    config: `${src}/webpack.config.babel.js`,
    content: './public/',
    // open: {
    //   app: 'Chrome'
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: [{ loader: 'babel-loader' }]
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        // use: [
        //   // HTMLファイル内でlinkタグにCSSを展開するための機能
        //   // 'style-loader',
        //   {
        //     // CSSをJSにバンドルするための機能
        //     loader: 'css-loader',
        //     options: {
        //       sourceMap: isDev,
        //       importLoaders: 2
        //     }
        //   },
        //   {
        //     // SASS => CSS
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: isDev
        //     }
        //   }
        // ]
        use: ExtractTextPlugin.extract({
          // HTMLファイル内でlinkタグにCSSを展開するための機能
          fallback: 'style-loader',
          use: [
            {
              // CSSをJSにバンドルするための機能
              loader: 'css-loader',
              options: {
                // url()を使うかどうか
                // url: false,
                minimize: true,
                sourceMap: isDev,
                importLoaders: 2
              }
            },
            {
              // prefixをつけるための機能
              // postcss-loaderの中にある機能を使うためこれを挟む
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers: [
                      'IE >= 11',
                      'last 2 versions'
                    ]
                  })
                ]
              }
            },
            {
              // SASS => CSSにするための機能
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }
          ]
        })
      },
      // {
      //   // jsにimportされている画像をバンドルするための機能
      //   // htmlで読み込まれている画像はパスの指定だけで可能（import不要）
      //   // 画像をBase64として取り込む
      //   test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
      //   // use: [{ loader: 'url-loader' }]
      //   use: ['url-loader']
      // },
      {
        // jsにimportされている画像を埋め込まず（バンドルせず）
        // htmlで読み込まれている画像はパスの指定だけで可能（import不要）
        // 任意のフォルダに保存するための機能
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images/'
            }
          }
        ]
      }
    ]
  }
};

export default config;