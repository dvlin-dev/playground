const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/index.tsx',
  output: {
    publicPath: "/public/",
    filename: "server.app.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/typescript",
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
        },
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};