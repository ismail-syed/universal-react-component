/* eslint-env node */
const webpack = require('webpack');
const {resolve} = require('path');
const {ip, port} = require('./app.js');

const {ReactLoadablePlugin} = require('react-loadable/webpack');
const app = resolve(__dirname, '../app');

module.exports = function createConfig(plugins, env) {
  return {
    name: 'example',
    plugins: [
      plugins.cdn('http://localhost:8080/webpack/assets/'),
      plugins.sass({
        autoInclude: [
          resolve(app, 'index.scss'),
          resolve(app, './Home/Home.scss'),
          resolve(app, './Bar/Bar.scss'),
          resolve(app, './Foo/Foo.scss'),
        ],
      }),
      plugins.devServer({
        ip,
        port,
      }),
      plugins.vendors(['react', 'react-dom', '@shopify/polaris']),
      plugins.webpack(config => {
        if (env.isProductionClient) {
          config.plugins.push(
            new ReactLoadablePlugin({
              filename: resolve(
                __dirname,
                '../build/client/react-loadable.json',
              ),
            }),
          );
        }

        return config;
      }),
    ],
  };
};
