import path from 'path';
import webpack from 'webpack';

module.exports = {
  context: path.join(__dirname, './_dev/assets/'),
  entry: './scripts/app.js',
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.join(__dirname, './_dev/assets/'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
      }],
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
};
