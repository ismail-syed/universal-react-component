import * as React from 'react';
import {renderToString} from 'react-dom/server';
import Koa from 'koa';
import {resolve} from 'path';
import {readJSONSync} from 'fs-extra';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import {ip, port, isProduction} from '../config/app.js';
import App from '../app';

// interface Entry {
//   path: string;
//   integrity: string;
// }

const app = new Koa();

if (isProduction) {
  console.log('=> Running production mode');
  app.use(ctx => {
    console.log(ctx.originalUrl);
    let modules: any = [];

    const {css, js} = readJSONSync(
      resolve(__dirname, '../build/client/assets.json'),
    ).entrypoints.main;

    const appContent = renderToString(
      <Loadable.Capture report={(moduleName: any) => modules.push(moduleName)}>
        <App />
      </Loadable.Capture>,
    );

    const stats = readJSONSync(
      resolve(__dirname, '../build/client/react-loadable.json'),
    );
    let bundles = getBundles(stats, modules);
    let styles = bundles.filter((bundle: any) => bundle.file.endsWith('.css'));
    let scripts = bundles.filter((bundle: any) => bundle.file.endsWith('.js'));

    ctx.status = 200;
    ctx.body = `
      <html>
        <head>
          ${cssImports([...css, ...styles])}
        </head>
        <div id="app">
          ${appContent}
        </div>
        ${javascriptImports([...js, ...scripts])}
        <script>window.__main__();</script>
      </html>
    `;
    console.log(modules);
  });
} else {
  console.log('=> Running development mode');
  const {css, js} = readJSONSync(
    resolve(__dirname, '../build/client/assets.json'),
  ).entrypoints.main;

  app.use(ctx => {
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

Loadable.preloadAll().then(() => {
  app.listen(port, ip, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
});

const cdn = 'http://localhost:8080/webpack/assets/';
function cssImports(css: any) {
  return css
    .map((cssPath: any) => {
      const file = cssPath.file ? `${cdn}${cssPath.file}` : cssPath.path;
      return `<link href="${file}" rel="stylesheet" type="text/css" />`;
    })
    .join('\n');
}
function javascriptImports(javascript: any) {
  return javascript
    .map((scriptPath: any) => {
      const file = scriptPath.file
        ? `${cdn}${scriptPath.file}`
        : scriptPath.path;
      return `<script type="text/javascript" src="${file}"></script>`;
    })
    .join('\n');
}
