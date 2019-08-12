const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    compress: true,
    port: 8080,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/v1/sbag": "http://192.168.10.244:5004"
    }
  }
});
