var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    // path: path.join(__dirname, 'build'),
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]'
        // loader: "style-loader!css-loader"
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
      
      // { test: /\.json$/,   loader: "json-loader" },
      // { test: /\.css$/,    loader: "style-loader!css-loader" },
      // { test: /\.less$/,   loader: "style-loader!css-loader!less-loader" },
      // { test: /\.jade$/,   loader: "jade-loader?self" },
      // { test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
      // { test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
      // { test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000" },
      // { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
      // { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      // { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      // { test: /\.svg$/,    loader: "file-loader?prefix=font/" },
    ]
  }
};