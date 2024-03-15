const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path")

const LOADERS = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: "babel-loader",
  },
  {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  },
];

const PLUGINS = [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
  }),
];

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  module: {
    rules: LOADERS,
  },
  plugins: PLUGINS,
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
};
