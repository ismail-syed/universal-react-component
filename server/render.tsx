/* eslint-disable spaced-comment, typescript/no-triple-slash-reference */
/// <reference path="../node_modules/react-universal-component/index.d.ts" />
/// <reference path="../node_modules/webpack-flush-chunks/index.d.ts" />

import {Context} from 'koa';

import * as React from 'react';
import {renderToString} from 'react-dom/server';

import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../app';

export default function serverRender({clientStats}: any) {
  return async (ctx: Context, next: any) => {
    const app = renderToString(<App />);
    const chunkNames = flushChunkNames();
    const before = ['runtime', 'vendor'];
    const {js, styles, cssHash, scripts, stylesheets} = flushChunks(
      clientStats,
      {
        chunkNames,
        before,
        outputPath: '/webpack/assets/',
      },
    );

    console.log('Dynamic Chunk Names Rendered: ', chunkNames);
    console.log('js: ', js);
    console.log('styles: ', styles);
    console.log('cssHash: ', cssHash);
    console.log('Scripts: ', scripts);
    console.log('Styles: ', stylesheets);

    ctx.body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Sewing-kit - React universal component</title>
        ${styles ? styles : ''}
      </head>
      <body>
        <div id="app"> ${app}</div>
        ${cssHash ? cssHash : ''}
        ${js ? js : ''}
      </body>
      </html>`;

    await next();
  };
}
