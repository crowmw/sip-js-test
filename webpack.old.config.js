const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = ["sip.js"];

let publishPath = "./public";

let config = {
  devtool: "source-map",
  context: path.resolve(__dirname),
  entry: {
    bundle: "./index.js",
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(publishPath),
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    sourceMapFilename: "[name].[chunkhash].js.map"
  },
  resolve: {
    modules: ["node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      title: "Systell Contact Center"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "string-replace-loader",
        query: {
          multiple: [
            { search: "$ApiBaseUrl", replace: "https://#{ApiBaseUrl}/" },
            { search: "$IdSvrBaseUrl", replace: "https://#{IdSvrBaseUrl}/" },
            { search: "$AppVersion", replace: process.env.npm_package_version }
          ]
        }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "app"),
        loader: "babel-loader",
        exclude: ["node_modules"],
        options: {
          presets: ["es2015", "react", "stage-2"]
        }
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
      // },
      {
        test: /\.woff$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]"
      },
      {
        test: /\.[ot]tf$/,
        loader:
          "url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
      },
      {
        test: /\.eot$/,
        loader:
          "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 500, name: "img/[name].[ext]" }
          }
        ]
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        query: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
};

module.exports = config;
