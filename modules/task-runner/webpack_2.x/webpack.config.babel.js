import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import junk from 'junk';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import WebpackOnBuildPlugin from 'on-build-webpack';

let pages = [];

function recursiveReadDir(filepath, cb) {
  const list = fs.readdirSync(path.join(__dirname, filepath));

  list.filter(junk.not).forEach( dirs => {
    if (dirs.charAt(0) !== '_') {
      if (fs.statSync(path.join(__dirname, `${filepath}/${dirs}`)).isDirectory()) {
        recursiveReadDir(`${filepath}/${dirs}`, cb);
      } else {
        cb.call(this, filepath);
      }
    }
  });
}

recursiveReadDir('./htdocs_dev/pug', filepath => {
  const rootpath = './htdocs_dev/pug/';
  const tar = filepath.substr(rootpath.length);

  // console.log(`${tar} => is 'tar' in 'recursiveReadDir'`);
  if (tar) {
    pages.push(tar);
  }
  // console.log(`${pages} => is 'pages' in 'recursiveReadDir'`);
});

export default {
  context: path.join(__dirname, './htdocs_dev'),
  entry: {
    app: './scripts/index.js'
    // lib: ['picturefill']
  },
  output: {
    path: path.join(__dirname, './htdocs'),
    filename: 'assets/scripts/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: path.join(__dirname, './htdocs_dev/pug/'),
              exports: false,
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader?name=assets/images/[name].[ext]'
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader?name=assets/fonts/[name].[ext]'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './htdocs'),
    port: 3000,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      root: __dirname,
      images: path.join(__dirname, './htdocs_dev/images')
    }
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'Android > 4.4', 'iOS > 9']
          })
        ]
      }
    }),
    new ExtractTextPlugin(`assets/styles/style.css`),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    // ↓↓↓ for uglify js file ↓↓↓
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // ↓↓↓ for index.html of root ↓↓↓
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: `pug/index.pug`
    }),
    // ↓↓↓ for index.html of underlyer ↓↓↓
    ...pages.map( filepath => {
      return new HtmlWebpackPlugin({
        chunks: ['app'],
        template: `pug/${filepath}/index.pug`,
        filename: `${filepath}/index.html`
      });
    }),
    new CopyWebpackPlugin([
      {
        context: 'json',
        from: '**/*',
        to: 'assets/json'
      }
    ]),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true,
      activateTerminalOnError: true,
      successSound: false
    }),
    new WebpackOnBuildPlugin(function(stats) {
      // Do whatever you want...
      setTimeout(() => {
        console.log(`
            ／￣￣￣ ｀＼
           /：＼___从＿＿ヽ
          i：：/‘’'‘’'‘’'‘i    C O M P I L E
          |：/ (●) , ､(●) |
         (6    ,ﾉ (､_,)､  |   F I N I S H E D ★
           ヽ     ﾄ==ｲ    ﾉ
             ＼ ＿｀ﾆ´_,／
        `);
      }, 900);
    })
  ]
};
