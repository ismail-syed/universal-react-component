/* eslint-env node */
const {ip, port} = require('./app.js');

module.exports = function createConfig(plugins) {
  return {
    name: 'example',
    plugins: [
      plugins.cdn('http://localhost:8080/'),
      plugins.devServer({
        ip,
        port,
      }),
    ],

  };
};
