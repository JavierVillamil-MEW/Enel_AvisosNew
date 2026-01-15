const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: distDir,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new StylelintPlugin({
      context: path.resolve(__dirname, '../src/', 'components'),
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    })
  ],
};
