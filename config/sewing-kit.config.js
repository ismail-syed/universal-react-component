/* eslint-env node */
const webpack = require('webpack');
const {ip, port} = require('./app.js');

var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = function createConfig(plugins, env) {
  return {
    name: 'example',
    plugins: [
      plugins.cdn('http://localhost:8080/webpack/assets/'),
      plugins.devServer({
        ip,
        port,
      }),
      plugins.vendors(['react', 'react-dom', '@shopify/polaris']),
      plugins.webpack(config => {
        config.module.rules = config.module.rules.map(loader => {
          if (loader.loader === 'babel-loader') {
            loader.options.plugins = ['universal-import'];
            return loader;
          }
          return loader;
        });
        config.plugins.push(
          new StatsWriterPlugin({
            filename: 'client-stats.json',
            fields: ['assetsByChunkName', 'publicPath'],
          }),
          new ExtractCssChunks(),
        );

        config.module.rules.push({
          test: /\.css$/,
          use: ExtractCssChunks.extract({
            use: 'css-loader',
          }),
        });
        // console.log('config: ', config);
        return config;
      }),
    ],
  };
};
