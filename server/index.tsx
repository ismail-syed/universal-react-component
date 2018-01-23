import * as React from 'react';
import {renderToString} from 'react-dom/server';
import Koa from 'koa';
import serverRender from './render';
import {resolve} from 'path';
import {readJSONSync} from 'fs-extra';
import {ip, port, isProduction} from '../config/app.js';
import App from '../app';

interface Entry {
  path: string,
  integrity: string,
}

const app = new Koa();

if (isProduction) {
  console.log('=> Running production mode');
  const clientStats = readJSONSync(resolve(__dirname, '../build/client/client-stats.json'));
  app.use(serverRender({clientStats}))
} else {
  console.log('=> Running development mode');
  const {css, js} = readJSONSync(resolve(__dirname, '../build/client/assets.json')).entrypoints.main;

  app.use((ctx) => {
    console.log(ctx.originalUrl);
    const appContent = renderToString(<App />);
    console.log('js: ', js);
    console.log('css: ', css);
    ctx.status = 200;
    ctx.body = `
      <html>
        <head>
          ${cssImports(css)}
        </head>
        <div id="app">
          ${appContent}
        </div>
        ${javascriptImports(js)}
      </html>
    `;
  });
}

const listener = app.listen(port, ip, () => {
  console.log(`Server listening on http://localhost:${port}`)
});
export default listener;

function cssImports(css: Entry[]) {
  return css
    .map((cssPath) => `<link href="${cssPath.path}" rel="stylesheet" type="text/css" />`)
    .join('\n');
}
function javascriptImports(javascript: Entry[]) {
  return javascript
    .map((scriptPath) => `<script type="text/javascript" src="${scriptPath.path}" defer></script>`)
    .join('\n');
}
